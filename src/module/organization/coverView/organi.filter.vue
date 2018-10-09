<template>
  <cover-view class="organi-filter-container" :class="type">
    <cover-view v-for="(item, index) in data" :key="index">
      <cover-view class="filter-item" @click="tapFilter(item)">{{item.text}}</cover-view>
      <cover-view class="line" v-if="index !== data.length - 1"></cover-view>
    </cover-view>
  </cover-view>
</template>
<script>
export default {
  props: ['data', 'type'],
  methods: {
    tapFilter (e) {
      this.$emit('tapFilter', e);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .organi-filter-container {
    position: fixed;
    top: 130rpx;
    z-index: 99;
    max-height: calc(80vh - 170rpx);
    overflow-y: scroll;
    padding: 6rpx 26rpx;
    border-radius: 16rpx;
    border: 1rpx solid #e6e6e6;
    // box-shadow: 0 4rpx 8rpx #bfbfbf; 不支持
    background-color: #ffffff;

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    // &::-webkit-scrollbar
    // {
    //     width: 8rpx;  /*滚动条宽度*/
    // }

    /*定义滑块 内阴影+圆角*/
    // &::-webkit-scrollbar-thumb
    // {
    //     border-radius: 10px;  /*滚动条的圆角*/
    //     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    //     background-color: $topic-color;  /*滚动条的背景颜色*/
    // }

    .filter-item {
      padding: 20rpx 0;
      // border-top: 1rpx solid #eaeaea; 不支持
      color: #454545;
      width: 100%;

      &:first-child {
        border: 0;
      }
    }

    .line {
      height: 2rpx;
      background-color: #bfbfbf;
      width: 100%;
    }
  }

  .type {
    left: 208rpx;
    width: calc(100vw - (2 * 208rpx));
  }

  .city {
    left: 40rpx;
    width: calc(100vw - 134rpx);
  }
</style>
