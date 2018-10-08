<template>
  <div class="search-organization-container">
    <div class="organi-filter-list">
      <div class="organi-filter-item">
        <hoo-select :filter="{text:'附近', event: 'organ_nearby'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="organi-filter-item">
        <hoo-select :filter="{text: '认证', event: 'organ_auth'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
    </div>
    <div class="organi-content">
      <div class="organi-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="organi-list">
        <hoo-organi-list></hoo-organi-list>
        <!-- <search-empty></search-empty> -->
      </div>
    </div>
  </div>
</template>
<script>
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
      if (this.checkedFilter[this.chooseFilterType].id !== e) {
        let params = {
          id: e,
          type: this.chooseFilterType
        };
        this.checkedFilter[this.chooseFilterType] = params;
      } else {
        this.checkedFilter[this.chooseFilterType] = null;
      }
      this.showFilterItemDesc = false;

      this.sendSearchRequest();
    },

    sendSearchRequest () {
      this.$wxUtils.loading({title: '查找中...'});
      let params = Object.assign(this.filterObject, this.checkedFilter);
      console.log('查找过滤的参数 机构', params);
      this.$network.search.searchCourse({params: params}).then(res => {
        this.alreadyUseSearch = true;
        console.log('返回模拟查找数据', res);
        setTimeout(() => {
          this.$wxUtils.loading({show: false});
        }, 2000);
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
<style lang="scss" scope>
  .search-organization-container {
    width: 100%;
    .organi-filter-list {
      display:flex;
      flex-flow:row nowrap;
      justify-content:space-between;
      align-items:center;
      padding:24rpx 20rpx;


      .organi-filter-item {
        width: 43%;
        padding: 0 4%;
        border-right: 1rpx solid #f2f2f2;

        &:last-child {
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
