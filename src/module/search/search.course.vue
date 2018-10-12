<template>
  <div class="search-course-container">
    <div class="course-filter-list">
      <div class="course-filter-item" @click="chooseFilter('course_type')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'学科', event: 'course_type'}"></hoo-select>
        </div>
      </div>
      <div class="course-filter-item" @click="chooseFilter('course_price')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'价格', event: 'course_price'}"></hoo-select>
        </div>
      </div>
      <div class="course-filter-item" @click="chooseFilter('course_time')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'时间', event: 'course_time'}"></hoo-select>
        </div>
      </div>
      <div class="course-filter-item" @click="chooseFilter('course_age')">
        <div class="filter-item-select">
          <hoo-select :filter="{text: '适龄', event: 'course_age'}"></hoo-select>
        </div>
      </div>
    </div>
    <div class="course-content">
      <div class="course-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="course-list">
        <hoo-course-list :params="resultData" v-if="resultData.length > 0"></hoo-course-list>
        <search-empty v-if="resultData.length === 0"></search-empty>
      </div>
    </div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
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
        resultData: [],
        showFilterItemDesc: false,
        chooseFilterType: '',
        filterData: {
          course_type: [
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '1'},
            {text: '英语', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '2'},
            {text: '中文', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '3'},
            {text: '音乐', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '4'},
            {text: '数学', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '5'},
            {text: '自然', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '6'},
            {text: '托管', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '7'},
            {text: '学前', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '8'},
            {text: '营地', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '9'},
            {text: '演讲', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '10'},
            {text: '工作坊', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '11'},
            {text: '游学', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '12'},
            {text: '机器人', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '13'},
            {text: '全部', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '14'}
          ],
          course_price: [
            {text: '全部', id: '0'},
            {text: '免费', id: '1'},
            {text: '50-100', id: '2'},
            {text: '100-300', id: '3'},
            {text: '300以上', id: '4'}
          ],
          course_time: [
            {text: '全部', id: '0'},
            {text: '近3天', id: '1'},
            {text: '一周内', id: '2'},
            {text: '一月内', id: '3'}
          ],
          course_age: [
            {text: '全部', id: '0'},
            {text: '幼儿园', id: '1'},
            {text: '小学生', id: '2'},
            {text: '初中生', id: '3'}
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
        this.paging.limit = 15;
        this.paging.total = 0;

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
        this.sendSearchRequest();
      },

      sendSearchRequest () {
        this.$wxUtils.loading({title: '查找中...'});
        let params = Object.assign(this.filterObject, this.checkedFilter);
        console.log('查找过滤的参数 课程', params);
        let requestParams = {
          name: 'inputVal' in params && params.inputVal ? params.inputVal : undefined,
          subject: 'course_type' in params && params.course_type ? params.course_type.text : undefined,
          limit: this.paging.limit,
          offset: this.paging.offset
        };

        this.$network.search.searchCourse(requestParams).then(res => {
          this.alreadyUseSearch = true;
          // console.log('返回查找课程数据', res);
          this.$wxUtils.loading({show: false});
          this.resultData = res.data;
          this.paging.total = res.total;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    onReachBottom () {
      console.log('111');
      if (this.paging.total > this.paging.limit) {
        this.paging.limit = this.paging.limit + 15;
        this.sendSearchRequest();
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
      .course-list {
        max-height: calc(100vh - 200rpx);
        overflow-y: auto;
      }
    }
  }
</style>
