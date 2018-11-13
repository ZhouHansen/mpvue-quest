<template>
  <div class="search-course-container">
    <div class="course-filter-list">
      <div class="course-filter-item" @click="chooseFilter('disc_type')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'类型', event: 'disc_type'}"></hoo-select>
        </div>
      </div>
      <div class="course-filter-item" @click="chooseFilter('course_price')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'价格', event: 'course_price'}"></hoo-select>
        </div>
      </div>
      <div class="course-filter-item">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'时间', event: 'course_time', type: 'date', chooseDate: checkedFilter.course_time}" @chooseDate="getChooseDate"></hoo-select>
        </div>
      </div>
      <div class="course-filter-item">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'适龄', event: 'course_age', type: 'number', chooseDate: checkedFilter.course_age}" @chooseDate="getChooseDate"></hoo-select>
        </div>
      </div>
    </div>
    <div class="course-content">
      <div class="course-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="course-list">
        <scroll-view class="organi-scroll" v-if="resultData && resultData.length > 0" scroll-y scroll-with-animation @scrolltolower="loadMore">
          <hoo-course-list :params="resultData"></hoo-course-list>
        </scroll-view>
        <search-empty v-if="(!resultData || resultData.length === 0)  && !showFilterItemDesc"></search-empty>
      </div>
    </div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import {TypeFilterData, AgeFilterData, PriceFilterData} from '@/utils/default.data';
  import Utils from '@/utils/index';
  import hooSelect from '@/components/select';
  import filterList from '@/module/search/search.header.filter.list';
  import hooCourseList from '@/module/course/course.list';
  import searchEmpty from '@/module/search/search.empty';

  export default {
    props: ['filterObject'],
    components: {
      hooSelect,
      filterList,
      hooCourseList,
      searchEmpty
    },
    data () {
      return {
        paging: {
          total: 0,
          limit: 15,
          offset: 0
        },
        resultData: null,
        showFilterItemDesc: false,
        chooseFilterType: '',
        filterData: {
          disc_type: TypeFilterData,
          course_price: PriceFilterData,
          course_age: AgeFilterData
        },
        chooseFilterData: null,
        checkedFilter: {}
      };
    },
    mounted () {
      this.sendSearchRequest();
    },
    onShow () {
      // this.sendSearchRequest();
    },
    onHide () {
      // this.refreshData();
    },
    methods: {
      refreshData () {
        this.resultData = null;
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
        console.log('接收到的过滤参数', e);
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
        this.sendSearchRequest();
      },

      getChooseDate (e) {
        this.showFilterItemDesc = false;

        // console.log('接收到的过滤参数', e);
        if (this.checkedFilter[e.id] === e.data) {
          return;
        }

        this.checkedFilter[e.id] = e.data;
        this.refreshData();
        this.sendSearchRequest();
      },

      sendSearchRequest () {
        this.$wxUtils.loading({title: '查找中...'});
        let params = Object.assign(this.filterObject, this.checkedFilter);
        // console.log('查找过滤的参数 课程', params);
        let requestParams = {
          name: 'inputVal' in params && params.inputVal ? params.inputVal : undefined,
          limit: this.paging.limit,
          offset: this.paging.offset,
          date: params.course_time ? params.course_time : undefined,
          pup: params.course_price ? params.course_price.pup : undefined,
          pdown: params.course_price ? params.course_price.pdown : undefined,
          ltype: params.disc_type ? params.disc_type.id : undefined,
          age: params.course_age ? params.course_age : undefined
        };

        this.$network.search.searchCourse(requestParams).then(res => {
          this.alreadyUseSearch = true;
          // console.log('返回查找课程数据', res);
          this.$wxUtils.loading({show: false});
          if (!this.resultData) {
            this.resultData = [];
          }
          let result = Utils.filterRepeatData(this.resultData, res.data);
          this.resultData = this.resultData.concat(result);
          this.paging.total = res.total;
        }).catch(err => {
          console.log(err);
        });
      },

      loadMore () {
        if (this.paging.total > this.paging.offset + this.paging.limit) {
          this.paging.offset = this.paging.offset + this.paging.limit;
          this.sendSearchRequest();
        }
      }
    }
  };
</script>
<style lang="scss" scope>
  @import '../../assets/style/variables.scss';

  .search-course-container {
    width: 100%;

    .course-filter-list {
      @include flex(space-between, center);
      padding: 0 20rpx;


      .course-filter-item {
        width: 25%;
        padding: 24rpx 0;

        .filter-item-select {
          padding: 0 4vw;
          border-right: 1rpx solid #f2f2f2;
        }

        &:last-child .filter-item-select {
          border: 0;
        }
      }
    }

    .course-content {
      position: relative;
      .course-list scroll-view{
        max-height: calc(100vh - 200rpx);
      }
    }
  }
</style>
