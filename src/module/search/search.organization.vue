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
        <scroll-view class="organi-scroll" v-if="organiData && organiData.length > 0" scroll-y scroll-with-animation @scrolltolower="loadMore">
          <hoo-organi-list :params="organiData"></hoo-organi-list>
        </scroll-view>
        <search-empty v-if="(!organiData || organiData.length === 0) && !showFilterItemDesc"></search-empty>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/index';
import * as MutationsType from '@/store/mutation.type';
import {AuthFilterData, NearbyFilterData} from '@/utils/default.data';
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
        organ_nearby: NearbyFilterData,
        organ_auth: AuthFilterData
      },
      chooseFilterData: null,
      checkedFilter: {},
      location: {},
      maxminLnglat: {},
      lnglatDis: 1000000
    };
  },
  mounted () {
    this.sendSearchRequest();
  },
  methods: {
    refreshData () {
      this.organiData = null;
      this.paging.offset = 0;
      this.paging.total = 0;
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
      // console.log('接收到的过滤参数', e);

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
      this.refreshData();

      if (this.chooseFilterType === 'organ_nearby') {
        this.constLngLatParams();
        return;
      }
      this.sendSearchRequest();
    },

    constLngLatParams () {
      this.location = this.$storage.get(this.$storageTypeName.location);
      this.maxminLnglat = Utils.ConvertDistanceToLogLat({distance: this.checkedFilter.organ_nearby.number, logLat: {lng: this.location.longitude, lat: this.location.latitude}, angle: 45});
      this.sendSearchRequest();
    },

    sendSearchRequest () {
      this.$wxUtils.loading({title: '查找中...'});
      let params = Object.assign(this.filterObject, this.checkedFilter);
      // console.log('查找过滤的参数 机构', params);
      let requestParams = {
        name: 'inputVal' in params && params.inputVal ? params.inputVal : undefined,
        endorsed: params.organ_auth && params.organ_auth.id ? params.organ_auth.id : undefined,
        limit: this.paging.limit,
        offset: this.paging.offset,
        latmin: this.maxminLnglat.latmin ? parseInt(this.maxminLnglat.latmin * this.lnglatDis) : undefined,
        latmax: this.maxminLnglat.latmax ? parseInt(this.maxminLnglat.latmax * this.lnglatDis) : undefined,
        lngmin: this.maxminLnglat.lngmin ? parseInt(this.maxminLnglat.lngmin * this.lnglatDis) : undefined,
        lngmax: this.maxminLnglat.lngmax ? parseInt(this.maxminLnglat.lngmax * this.lnglatDis) : undefined,
        lat: this.location.latitude ? parseInt(this.location.latitude * this.lnglatDis) : undefined,
        lng: this.location.longitude ? parseInt(this.location.longitude * this.lnglatDis) : undefined
      };

      this.$network.search.searchOrgani(requestParams).then(res => {
        this.alreadyUseSearch = true;
        // console.log('返回查找机构数据', res);
        this.$wxUtils.loading({show: false});

        if (!this.organiData) {
          this.organiData = [];
        }
        let result = Utils.filterRepeatData(this.organiData, res.data);
        this.organiData = this.organiData.concat(result);
        this.paging.total = res.total;
      }).catch(err => {
        // console.log(err);
      });
    },

    loadMore () {
      if (this.paging.total > this.paging.limit + this.paging.offset) {
        this.paging.offset = this.paging.offset + this.paging.limit;
        this.sendSearchRequest();
      }
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

      .organi-list scroll-view{
        max-height: calc(100vh - 200rpx);
      }
    }
  }
</style>
