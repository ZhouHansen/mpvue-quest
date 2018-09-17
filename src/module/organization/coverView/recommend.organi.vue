<template>
  <cover-view class="recommend-organi-container">
    <cover-view class="title">推荐品牌机构</cover-view>
    <cover-view class="recommend-list-scroll">
      <cover-view class="recommend-list">
        <cover-view class="recommend-item"></cover-view>
        <cover-view class="recommend-item"></cover-view>
        <cover-view class="recommend-item"></cover-view>
        <cover-view class="recommend-item"></cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>
<script>
  export default {

  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .recommend-organi-container {
    position: absolute;
    padding: 40rpx;
    border-radius: 16rpx;
    background-color: #ffffff;
    bottom: 26rpx;
    width: calc(100vw - 160rpx);
    left: 40rpx;
    overflow: scroll;

    .title {
      border-left: 8rpx solid $topic-color;
      padding-left: 20rpx;
      color: #000000;
      font-size: 16px;
    }

    .recommend-list-scroll {
      width: 100%;
      overflow: scroll;

      .recommend-list {
        align-items: center;
        margin-top: 30rpx;
        overflow: scroll;

        .recommend-item {
          display: inline-block;
          width: 20vw;
          height: 20vw;
          margin-right: 2vw;
          background-color: $topic-color;
          border-radius: 16rpx;
        }
      }
    }
  }
</style>
