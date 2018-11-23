<template>
  <div class="front-container" :class="{'overflow-hidden':isOverflow}">
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <label class="weui-search-bar__label" @click="goSearchPage">
          <div class="search-label-body flex-row-center">
            <span class="search-icon"></span>
            <div class="weui-search-bar__text ellipsis input-placeholder">搜索课程、活动、老师、学校</div>
          </div>
        </label>
      </div>
      <div class="disc-filter-list">
        <div class="disc-filter-item" @click="chooseDate">
          <div class="filter-item-select">
            <hoo-select :filter="{text:'日期', event: 'disc_time', type: 'customDate'}"></hoo-select>
          </div>
        </div>
        <div class="disc-filter-item" @click="chooseFilter('disc_type')">
          <div class="filter-item-select">
            <hoo-select :filter="{text: checkedFilter.disc_type && checkedFilter.disc_type.text ? checkedFilter.disc_type.text : '类型', event: 'disc_type'}"></hoo-select>
          </div>
        </div>
        <div class="disc-filter-item" @click="chooseFilter('disc_order')">
          <div class="filter-item-select">
            <hoo-select :filter="{text: '排序', event: 'disc_order'}"></hoo-select>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="disc-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
    </div>
    <div class="section-list">
      <div class="section-item" v-if="sections.length > 0" v-for="item in sections" :key="item.id">
        <hoo-section :section-data="item" :location="location"></hoo-section>
      </div>
      <hoo-empty :type="'discovery'" :text="'~下滑刷一下~'" v-if="!sections || sections.length === 0"></hoo-empty>
    </div>
    <hoo-scrolltop></hoo-scrolltop>
    <hoo-calendar v-if="showCalendar" :params="{id: 'disc_time', chooseDayText: checkedFilter.disc_time?checkedFilter.disc_time:null}" @chooseDate="getChooseDate" @hideChooseDate="chooseDate"></hoo-calendar>
  </div>
</template>

<script>
import * as MutationsType from '@/store/mutation.type';
import {TypeFilterData, OrderFilterData} from '@/utils/default.data';
import {GetAddressUseLngLat} from '@/utils/location';
import Utils from '@/utils/index';
import hooSelect from '@/components/select';
import hooScrolltop from '@/components/scrolltop';
import hooCalendar from '@/components/calendar';
import hooSection from '@/module/discovery/section.item';
import filterList from '@/module/search/search.header.filter.list';
import hooEmpty from '@/components/empty';

export default {
  components: {
    hooSection,
    filterList,
    hooSelect,
    hooScrolltop,
    hooEmpty,
    hooCalendar
  },
  data () {
    return {
      sections: null,
      interval: null,
      location: null,
      limit: 10,
      offset: 0,
      total: 0,

      showFilterItemDesc: false,
      chooseFilterType: '',
      filterData: {
        disc_type: TypeFilterData,
        disc_order: OrderFilterData
      },
      chooseFilterData: null,
      checkedFilter: {},
      showCalendar: false
    };
  },
  created () {
  },
  mounted () {
    this.$wxUtils.loading({title: '加载中...'});
    this.$wxUtils.setNavTitle('发现');
    this.$wxUtils.getLocation().then(res => {
      this.location = res;
      GetAddressUseLngLat(res, () => {
        this.sections = [];
        this.init();
      });
    }).catch(() => {
      this.init();
    });
  },
  onShow () {
    if (!this.location) {
      this.location = this.$storage.get(this.$storageTypeName.location);
      // console.log(this.location);
    }
  },
  onHide () {
    this.showFilterItemDesc = false;
    this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
  },
  onPullDownRefresh () {
    this.$wxUtils.stopPullDownRefresh();

    this.chooseFilterData = null;
    this.checkedFilter = {};
    this.showFilterItemDesc = false;
    this.chooseFilterType = '';

    this.offset = 0;
    this.total = 0;
    this.sections = null;
    setTimeout(() => {
      this.getDashboardData();
    }, 500);
  },
  computed: {
    isOverflow: function () {
      return this.$store.state.search.isOverFlowStatu;
    }
  },
  methods: {

    init () {
      this.interval = setInterval(() => {
        let obj = this.$storage.get(this.$storageTypeName.openid);
        if (obj && obj.openid) {
          this.getDashboardData();
          clearInterval(this.interval);
        }
      }, 2000);
    },

    goSearchPage () {
      this.$router.push('/pages/search/index');
    },

    chooseFilter (e) {
      if (this.chooseFilterType === '') {
        this.chooseFilterType = e;
        this.showFilterItemDesc = true;
        this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
      } else
      if (this.chooseFilterType === e) {
        this.showFilterItemDesc = !this.showFilterItemDesc;
        this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, this.showFilterItemDesc);
        return false;
      } else
      if (this.chooseFilterType !== e) {
        this.chooseFilterType = e;
        this.showFilterItemDesc = true;
        this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
      }

      this.chooseFilterData = this.filterData[this.chooseFilterType];

      if (!this.checkedFilter[this.chooseFilterType]) {
        this.checkedFilter[this.chooseFilterType] = {
          type: this.chooseFilterType,
          id: undefined
        };
      }
    },

    doneChooseFilter (e) {
      // console.log('接收到的过滤参数', e);
      this.offset = 0;
      this.total = 0;

      let params = {
        type: this.chooseFilterType
      };
      if (this.checkedFilter[this.chooseFilterType].id !== e.id) {
        params = Object.assign(params, e);
        this.checkedFilter[this.chooseFilterType] = params;
      } else {
        this.checkedFilter[this.chooseFilterType] = params;
      }
      this.showFilterItemDesc = false;
      this.sections = [];

      // 设置距离排序参数
      if (this.checkedFilter.disc_order && this.checkedFilter.disc_order.id === 'latlng') {
        this.checkedFilter.disc_order.lng = this.location.longitude.toFixed(2) * 1000000;
        this.checkedFilter.disc_order.lat = this.location.latitude.toFixed(2) * 1000000;
      }

      this.getDashboardData();
    },

    chooseDate () {
      this.showCalendar = !this.showCalendar;
    },

    getChooseDate (e) {
      if (this.checkedFilter[e.id] === e.data) {
        return;
      }

      this.offset = 0;
      this.total = 0;
      this.sections = [];
      this.showFilterItemDesc = false;

      // console.log('接收到的过滤参数', e);
      this.checkedFilter[e.id] = e.data;
      this.getDashboardData();
    },

    getDashboardData () {
      // this.checkedFilter

      let requestParams = {
        limit: this.limit,
        offset: this.offset,
        ltype: this.checkedFilter.disc_type ? this.checkedFilter.disc_type.id : undefined,
        date: this.checkedFilter.disc_time ? this.checkedFilter.disc_time : undefined,
        lng: this.checkedFilter.disc_order ? this.checkedFilter.disc_order.lng : undefined,
        lat: this.checkedFilter.disc_order ? this.checkedFilter.disc_order.lat : undefined
      };

      this.$wxUtils.loading({title: '加载中...'});
      this.$network.discovery.getDashboard(requestParams).then(res => {
        // console.log(res);
        this.$wxUtils.loading({show: false});
        if (res.e !== 0) {
          this.$wxUtils.toast({title: res.e.msg});
          return;
        }
        if (!this.sections) {
          this.sections = [];
        }
        let result = Utils.filterRepeatData(this.sections, res.data);
        this.sections = this.sections.concat(result);
        this.total = res.total;
      });
    }
  },

  onReachBottom () {
    if (this.total > this.offset + this.limit) {
      this.offset = this.offset + this.limit;
      this.getDashboardData();
    }
  }

};
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables.scss';

  .front-container {
    width: 100%;
    min-height: calc(100vh - 10rpx);
    border-top: $navigateTitleBottomBorder;
    background-color: #f9f9f9;
    padding-bottom:10rpx;

    .weui-search-bar {
      background-color: #ffffff;
      border: 0;
      padding: 16rpx 5%;

      @include flex(space-between, center, column nowrap);

      .weui-search-bar__form {
        border: 0;
        border-radius: 40rpx;
        width: 100%;
        overflow: hidden;

        .weui-search-bar__label {
          position: inherit;

          .search-icon {
            display: inline-block;
            width: 28rpx;
            height: 28rpx;
            vertical-align: middle;
            @include backgroundImg('../../assets/images/ic_search.png');
            margin-right: 10rpx;
          }

          .search-label-body {
            padding:10rpx;
            background-color: #f9f9f9;
          }
        }
      }
    }


    .disc-filter-list {
      @include flex(space-between, center);
      width: 100%;

      .disc-filter-item {
        width: calc(100% / 3);
        padding: 24rpx 0;
        flex-shrink: 0;

        .filter-item-select {
          padding: 0 3vw;
          border-right: 1rpx solid #f2f2f2;
        }

        &:last-child .filter-item-select {
          border: 0;
        }
      }
    }

    .disc-filter-item-desc {
      position: relative;
    }
  }
</style>
