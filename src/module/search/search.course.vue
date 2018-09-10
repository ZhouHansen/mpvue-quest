<template>
  <div class="search-course-container">
    <div class="course-filter-list">
      <div class="course-filter-item">
        <hoo-select :filter="{text:'学科', event: 'course_type'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="course-filter-item">
        <hoo-select :filter="{text:'价格', event: 'course_price'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="course-filter-item">
        <hoo-select :filter="{text:'时间', event: 'course_time'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="course-filter-item">
        <hoo-select :filter="{text: '适龄', event: 'course_age'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
    </div>
    <div class="course-content">
      <div class="course-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="course-list">
        <div class="course-item"></div>
        <div class="course-item"></div>
        <div class="course-item"></div>
        <div class="course-item"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import hooSelect from '@/components/select';
  import filterList from '@/module/search/search.header.filter.list';

  export default {
    components: {
      hooSelect,
      filterList
    },
    data () {
      return {
        showFilterItemDesc: false,
        chooseFilterType: '',
        filterData: {
          course_type: [
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '1'},
            {text: '英语', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '2'},
            {text: '数学', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '3'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '4'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '5'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '6'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '7'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '8'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '9'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '10'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '11'},
            {text: '美术', icon: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png', id: '12'}
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
      }
    }
  };
</script>
<style lang="scss" scope>
  .search-course-container {
    width: 100%;

    .course-filter-list {
      display:flex;
      flex-flow:row nowrap;
      justify-content:space-between;
      align-items:center;
      padding:24rpx 20rpx;


      .course-filter-item {
        width: 20%;
        padding: 0 2%;
        border-right: 1rpx solid #f2f2f2;

        &:last-child {
          border: 0;
        }
      }
    }

    .course-content {
      position: relative;

      .course-item {
        border-top: 1rpx solid #bfbfbf;
        height: 10vh;
        background-color: palevioletred;
        width: 100%;
        padding: 40rpx;
      }
    }
  }
</style>
