<template>
  <div class="search-teacher-container">
    <div class="teacher-filter-list">
      <div class="teacher-filter-item" @click="chooseFilter('course_type')">
        <div class="filter-item-select">
          <hoo-select :filter="{text: '学科', event: 'course_type'}"></hoo-select>
        </div>
      </div>
      <div class="teacher-filter-item" @click="chooseFilter('teacher_auth')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'认证', event: 'teacher_auth'}"></hoo-select>
        </div>
      </div>
      <div class="teacher-filter-item" @click="getOrderList">
        <div class="teacher-praise">
          <span>好评</span>
          <span class="teacher-praise-icon"
           :class="{
            'normal-icon': orderContrl === 'normal',
            'positive-order-icon': orderContrl === 'positive',
            'negative-order-icon': orderContrl === 'negative'}"></span>
        </div>
      </div>
    </div>
    <div class="teacher-content">
      <div class="teacher-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="teacher-list">
        <scroll-view class="organi-scroll" v-if="teacherData && teacherData.length > 0" scroll-y scroll-with-animation @scrolltolower="loadMore">
          <hoo-teacher-list :params="teacherData" ></hoo-teacher-list>
        </scroll-view>
        <search-empty v-if="(!teacherData || teacherData.length === 0) && !showFilterItemDesc"></search-empty>
      </div>
    </div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import {SubjectsFilterData, AuthFilterData} from '@/utils/default.data';
  import Utils from '@/utils/index';
  import hooSelect from '@/components/select';
  import filterList from '@/module/search/search.header.filter.list';
  import hooTeacherList from '@/module/teacher/teacher.list';
  import searchEmpty from '@/module/search/search.empty';

  export default {
    props: ['filterObject'],
    components: {
      hooSelect,
      filterList,
      hooTeacherList,
      searchEmpty
    },
    data () {
      return {
        paging: {
          total: 0,
          limit: 15,
          offset: 0
        },
        teacherData: null,
        showFilterItemDesc: false,
        chooseFilterType: '',
        orderContrl: 'normal',
        filterData: {
          course_type: SubjectsFilterData,
          teacher_auth: AuthFilterData
        },
        chooseFilterData: null,
        checkedFilter: {
          orderContrl: 'normal'
        }
      };
    },
    mounted () {
      this.sendSearchRequest();
    },
    methods: {
      refreshData () {
        this.teacherData = null;
        this.paging.offset = 0;
        this.paging.total = 0;
      },

      chooseFilter (e) {
        if (this.chooseFilterType === '') {
          this.chooseFilterType = e;
          if (!this.showFilterItemDesc) {
            this.showFilterItemDesc = true;
            this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
          }
        } else
        if (this.chooseFilterType === e) {
          this.showFilterItemDesc = !this.showFilterItemDesc;
          this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, this.showFilterItemDesc);
          return false;
        } else
        if (this.chooseFilterType !== e) {
          this.chooseFilterType = e;
          if (!this.showFilterItemDesc) {
            this.showFilterItemDesc = true;
            this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
          }
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

      getOrderList () {
        if (this.showFilterItemDesc) {
          this.showFilterItemDesc = false;
          this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
        }

        let orderby = '';

        if (this.orderContrl === 'normal') {
          this.orderContrl = 'positive';
          this.checkedFilter.sort = 'favorcount';
          orderby = 'asc';
        } else
        if (this.orderContrl === 'positive') {
          this.orderContrl = 'negative';
          this.checkedFilter.sort = 'favorcount';
          orderby = 'desc';
        } else {
          this.orderContrl = 'normal';
          this.checkedFilter.sort = undefined;
          orderby = undefined;
        }

        this.checkedFilter.orderby = orderby;
        this.refreshData();
        this.sendSearchRequest();
      },

      sendSearchRequest () {
        this.$wxUtils.loading({title: '查找中...'});
        let params = Object.assign(this.filterObject, this.checkedFilter);
        console.log('查找过滤的参数 老师', params);
        let requestParams = {
          name: 'inputVal' in params && params.inputVal ? params.inputVal : undefined,
          limit: this.paging.limit,
          offset: this.paging.offset,
          sort: 'sort' in params && params.sort ? params.sort : undefined,
          order: 'orderby' in params && params.orderby ? params.orderby : undefined,
          endorsed: params.teacher_auth && params.teacher_auth.id ? parseInt(params.teacher_auth.id) : undefined
        };

        if (params.course_type && params.course_type.id !== 'all') {
          requestParams['subjects'] = params.course_type.id;
        }

        this.$network.search.searchTearch(requestParams).then(res => {
          this.alreadyUseSearch = true;
          console.log('返回查找老师数据', res);
          this.$wxUtils.loading({show: false});
          if (!this.teacherData) {
            this.teacherData = [];
          }
          let result = Utils.filterRepeatData(this.teacherData, res.data);
          this.teacherData = this.teacherData.concat(result);
          console.log(this.teacherData);
          this.paging.total = res.total;
        }).catch(err => {
          console.log(err);
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

  .search-teacher-container {
    width: 100%;

    .teacher-filter-list {
      @include flex(space-between, center);
      padding: 0 20rpx;


      .teacher-filter-item {
        width: 34%;
        padding: 24rpx 0;

        .filter-item-select {
          padding: 0 6vw;
          border-right: 1rpx solid #f2f2f2;
        }

        .teacher-praise {
          @include flex(space-between, center);
          padding: 0 6vw;


          .teacher-praise-icon {
            width: 24rpx;
            height: 24rpx;
          }

          .normal-icon {
            background: url('../../assets/images/list_nor.png') no-repeat 50% 50%;
            background-size: contain;
          }

          //正序
          .positive-order-icon {
            background: url('../../assets/images/list_nor_p.png') no-repeat 50% 50%;
            background-size: contain;
          }
          //倒序
          .negative-order-icon {
            background: url('../../assets/images/list_nor_n.png') no-repeat 50% 50%;
            background-size: contain;
          }
        }
      }
    }

    .teacher-content {
      position: relative;

      .teacher-list scroll-view{
        height: calc(100vh - 200rpx);
      }
    }
  }
</style>
