<template>
  <div class="arrange-container">
    <div class="arrage-list">
      <div class="arrange-item">
        <div class="arrange-icon book"></div>
        <div class="arrange-text">活动早上9:00入场，请购票后等待主办方</div>
      </div>
      <div class="arrange-item">
        <div class="arrange-icon time"></div>
        <div class="arrange-text">活动早上9:00入场，请购票后等待主办方</div>
      </div>
      <div class="arrange-item">
        <div class="arrange-icon kidney"></div>
        <div class="arrange-text">活动早上9:00入场，请购票后等待主办方</div>
      </div>
      <div class="arrange-item">
        <div class="arrange-icon info"></div>
        <div class="arrange-text">活动早上9:00入场，请购票后等待主办方活动早上9:00入场，请购票后等待主办方活动早上9:00入场，请购票后等待主办方</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data']
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .arrange-container {

    .arrange-item {
      margin-top: 30rpx;
      font-size: 16px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;

      .arrange-icon {
        width: 36rpx;
        height: 36rpx;
        margin-right: 10rpx;
        flex-shrink: 0;
        margin-top: 4rpx;
      }

      .time {
        background: url('../assets/images/time.png') no-repeat 50% 50%;
        background-size: contain;
      }

      .kidney {
        background: url('../assets/images/i-kidney.png') no-repeat 50% 50%;
        background-size: contain;
      }

      .info {
        background: url('../assets/images/info-circle.png') no-repeat 50% 50%;
        background-size: contain;
      }

      .book {
        background: url('../assets/images/book.png') no-repeat 50% 50%;
        background-size: contain;
      }
    }
  }
</style>
