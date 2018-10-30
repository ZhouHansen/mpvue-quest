<template>
  <div class="search-organization-container">
    <div class="organi-filter-list">
      <div class="organi-filter-item" @click="chooseFilter('organ_nearby')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'附近', event: 'organ_nearby'}"></hoo-select>
        </div>
      </div>
      <div class="organi-filter-item" @click="chooseFilter('organ_auth')">
        <div class="filter-item-select">
          <hoo-select :filter="{text: '认证', event: 'organ_auth'}"></hoo-select>
        </div>
      </div>
    </div>
    <div class="organi-content">
      <div class="organi-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="organi-list">
        <hoo-organi-list v-if="organiData && organiData.length > 0" :params="organiData"></hoo-organi-list>
        <search-empty v-if="!organiData || organiData.length === 0"></search-empty>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/index';
import * as MutationsType from '@/store/mutation.type';
import hooSelect from '@/components/select';
import filterList from '@/module/search/search.header.filter.list';
import hooOrganiList from '@/module/organization/organization.list';
import searchEmpty from '@/module/search/search.empty';

export default {
  props: ['filterObject'],
  components: {
    hooSelect,
    filterList,
    hooOrganiList,
    searchEmpty
  },
  data () {
    return {
      paging: {
        total: 0,
        limit: 15,
        offset: 0
      },
      organiData: null,
      showFilterItemDesc: false,
      chooseFilterType: '',
      filterData: {
        organ_nearby: [
          {text: '全部', id: '1'},
          {text: '500米内', id: '2'},
          {text: '1000米内', id: '3'},
          {text: '3000米内', id: '4'}
        ],
        organ_auth: [
          {text: '全部', id: '1'},
          {text: '已认证', id: '2'}
        ]
      },
      chooseFilterData: null,
      checkedFilter: {}
    };
  },
  mounted () {
    this.sendSearchRequest();
  },
  onHide () {
    this.paging.limit = 15;
    this.paging.total = 0;
    this.organiData = null;
  },
  methods: {
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
      this.paging.limit = 15;
      this.paging.total = 0;

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
      this.organiData = null;
      this.sendSearchRequest();
    },

    sendSearchRequest () {
      this.$wxUtils.loading({title: '查找中...'});
      let params = Object.assign(this.filterObject, this.checkedFilter);
      console.log('查找过滤的参数 机构', params);
      let requestParams = {
        name: 'inputVal' in params && params.inputVal ? params.inputVal : undefined,
        limit: this.paging.limit,
        offset: this.paging.offset
      };
      this.$network.search.searchOrgani(requestParams).then(res => {
        this.alreadyUseSearch = true;
        console.log('返回查找机构数据', res);
        this.$wxUtils.loading({show: false});

        if (!this.organiData) {
          this.organiData = [];
        }
        let result = Utils.filterRepeatData(this.organiData, res.data);
        this.organiData = this.organiData.concat(result);
        this.paging.total = res.total;
      }).catch(err => {
        console.log(err);
      });
    }
  },
  onReachBottom () {
    if (this.paging.total > this.paging.limit + this.paging.offset) {
      this.paging.offset = this.paging.offset + this.paging.limit;
      this.sendSearchRequest();
    }
  }
};
</script>
<style lang="scss" scope>
  @import '../../assets/style/variables.scss';

  .search-organization-container {
    width: 100%;
    .organi-filter-list {
      @include flex(space-between, center);
      padding: 0 20rpx;


      .organi-filter-item {
        width: 50%;
        padding: 24rpx 0;

        .filter-item-select {
          padding: 0 8vw;
          border-right: 1rpx solid #f2f2f2;
        }

        &:last-child .filter-item-select {
          border: 0;
        }
      }
    }

    .organi-content {
      position: relative;

      .organi-list {
        max-height: calc(100vh - 200rpx);
        overflow-y: auto;
      }
    }
  }
</style>
