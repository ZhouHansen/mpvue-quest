<template>
  <div class="search-course-container">
    <div class="course-filter-list">
      <div class="course-filter-item">
        <hoo-select :filter="{text:'学科', event: 'type'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="course-filter-item">
        <hoo-select :filter="{text:'价格', event: 'price'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="course-filter-item">
        <hoo-select :filter="{text:'时间', event: 'time'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="course-filter-item">
        <hoo-select :filter="{text: '适龄', event: 'age'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
    </div>
    <div class="course-content">
      <div class="course-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter"></filter-list>
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
        chooseFilterType: ''
      };
    },
    methods: {
      chooseFilter (e) {
        console.log(this.chooseFilterType);
        console.log(e);
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
      },

      doneChooseFilter (e) {
        console.log('接收到的过滤参数', e);
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
