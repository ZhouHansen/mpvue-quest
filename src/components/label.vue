<template>
  <div class="label-container">
    <span class="label-header">{{typeText}}</span>
    <span class="label-span" v-for="(item, index) in labelArr" :key="index">{{item}}</span>
  </div>
</template>
<script>
export default {
  props: ['typeText', 'labelArr'],
  data () {
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .label-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;

    span {
      padding: 2rpx 8rpx;
      border-radius: 16rpx;
      font-size: 12px;
      margin-right: 16rpx;
      margin-top:10rpx;
    }

    .label-header {
      background-color: $labelBackgroundColor;
      color: $topic-color;
    }

    .label-span {
      background-color: $labelCommonBackgroundColor;
      color: $labelCommonColor;
    }
  }
</style>

