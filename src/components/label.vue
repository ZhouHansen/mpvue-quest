<template>
  <div class="label-container">
    <span class="label-header" v-for="(item, index) in typeText" :key="index">{{item}}</span>
    <span class="label-span" v-if="labelArr[0] !== ''" v-for="(item, index) in labelArr" :key="index">{{item}}</span>
  </div>
</template>
<script>
export default {
  props: ['typeText', 'labelArr', 'type'],
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

