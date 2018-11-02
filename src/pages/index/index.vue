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
        <div class="disc-filter-item">
          <div class="filter-item-select">
            <hoo-select :filter="{text:'日期', event: 'disc_time', type: 'date', chooseDate: checkedFilter.disc_time}" @chooseDate="getChooseDate"></hoo-select>
          </div>
        </div>
        <div class="disc-filter-item" @click="chooseFilter('disc_type')">
          <div class="filter-item-select">
            <hoo-select :filter="{text: '类型', event: 'disc_type'}"></hoo-select>
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
  </div>
</template>

<script>
import * as MutationsType from '@/store/mutation.type';
import {TypeFilterData} from '@/utils/default.data';
import {GetAddressUseLngLat} from '@/utils/location';
import Utils from '@/utils/index';
import hooSelect from '@/components/select';
import hooSection from '@/module/discovery/section.item';
import filterList from '@/module/search/search.header.filter.list';
import hooScrolltop from '@/components/scrolltop';
import hooEmpty from '@/components/empty';

export default {
  components: {
    hooSection,
    filterList,
    hooSelect,
    hooScrolltop,
    hooEmpty
  },
  data () {
    return {
      sections: null,
      interval: null,
      location: null,
      limit: 15,
      offset: 0,
      total: 0,

      showFilterItemDesc: false,
      chooseFilterType: '',
      filterData: {
        disc_type: TypeFilterData
      },
      chooseFilterData: null,
      checkedFilter: {}
    };
  },
  created () {
  },
  mounted () {
    this.$wxUtils.loading({title: '加载中...'});

    this.$wxUtils.setNavTitle('发现');

    this.interval = setInterval(() => {
      this.getDashboardData();
      let obj = this.$storage.get(this.$storageTypeName.openid);
      if (obj && obj.openid) {
        clearInterval(this.interval);
      }
    }, 2000);

    this.$wxUtils.getLocation().then(res => {
      this.location = res;
      GetAddressUseLngLat(res);
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
    this.offset = 0;
    this.total = 0;
    this.sections = null;
    this.getDashboardData();
  },
  computed: {
    isOverflow: function () {
      return this.$store.state.search.isOverFlowStatu;
    }
  },
  methods: {
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
          id: null
        };
      }
    },

    doneChooseFilter (e) {
      console.log('接收到的过滤参数', e);
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

      this.getDashboardData();
    },

    getChooseDate (e) {
      this.offset = 0;
      this.total = 0;
      this.sections = [];
      this.showFilterItemDesc = false;

      console.log('接收到的过滤参数', e);
      this.checkedFilter[e.id] = e.data;
      this.getDashboardData();
    },

    getDashboardData () {
      // this.checkedFilter

      let requestParams = {
        limit: this.limit,
        offset: this.offset,
        ltype: this.checkedFilter.disc_type ? this.checkedFilter.disc_type.id : undefined,
        date: this.checkedFilter.disc_time ? this.checkedFilter.disc_time : undefined
      };

      this.$wxUtils.loading({title: '加载中...'});
      this.$network.discovery.getDashboard(requestParams).then(res => {
        console.log(res);
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
    min-height: 100vh;
    border-top: $navigateTitleBottomBorder;
    background-color: #f9f9f9;

    .weui-search-bar {
      background-color: #ffffff;
      border: 0;
      padding: 16rpx 5%;

      @include flex(space-between, center);

      .weui-search-bar__form {
        border: 0;
        border-radius: 40rpx;
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
      width: 50%;

      .disc-filter-item {
        width: 50%;
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
