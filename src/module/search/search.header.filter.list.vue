<template>
  <div class="search-filter-container">
    <div class="filter-list" v-if="checkedFilter && checkedFilter.type !== 'course_type'">
      <div class="filter-item" v-for="(item, index) in filter" :key="index"
       :class="{'filter-checked': checkedFilter && checkedFilter.id === item.id}" @click="chooseFilterParam(item.id)">{{item.text}}</div>
    </div>

    <div class="course-filter-list" v-if="checkedFilter && checkedFilter.type === 'course_type'">
      <div class="course-filter-item"
        v-for="(item, index) in filter" :key="index"
        :class="{'course-filter-item-checked': checkedFilter && checkedFilter.id === item.id}" @click="chooseFilterParam(item.id)">
        <div class="course-filter-item-icon">
          <img :src="item.icon" />
        </div>
        <p class="course-filter-item-text">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import * as MutationsType from '@/store/mutation.type';

export default {
  props: ['filter', 'checkedFilter'],
  mounted () {
  },
  methods: {
    chooseFilterParam (e) {
      this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
      // console.log('发送的过滤参数', e);
      let commitData = this.filter.filter((item, index) => {
        return item.id === e;
      });
      this.$emit('chooseFilterDone', commitData[0]);
    }
  }
};
</script>
<style lang="scss" scoped>
  $art: require('../assets/images/ic_art.png');
  .search-filter-container {
    width: 100%;
    position: absolute;
    top: 0;
    height: 100vh;
    color: #9f9f9f;
    background-color:#fff;
    z-index: 2;
    padding-top:10rpx;

    .filter-list {
      overflow-y: auto;
      max-height: 80%;


      .filter-item {
        padding: 24rpx 40rpx;
        border-bottom: 1rpx solid #e1e1e1;
      }

      .filter-checked {
        color: #000000;
      }
    }

    .course-filter-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      padding: 0 5%;
      overflow-y: auto;
      max-height: 80%;


      .course-filter-item {
        flex-shrink: 0;
        width: calc((100% - 16% - 80rpx) / 4);
        box-shadow: 0 4rpx 20rpx #D4D4D4;
        padding: 20rpx 2%;
        margin: 10rpx 10rpx;
        text-align: center;

        .course-filter-item-icon {
          img {
            display: inline-block;
            width: 50rpx;
            height: 50rpx;
          }
        }
      }

      .course-filter-item-checked {
        background-color: #f0f0f0;
      }
    }
  }
</style>
