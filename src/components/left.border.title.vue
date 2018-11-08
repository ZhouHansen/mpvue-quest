<template>
  <div class="have-left-topic-border-container" v-if="title">
    <span></span>
    <div class="content">{{title}}</div>
  </div>
</template>
<script>
export default {
  props: ['title']
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .have-left-topic-border-container {
    @include flex(flex-start);

    span {
      display: inline-block;
      width: 6rpx;
      height: 20rpx;
      background-color: #32DA31;
      margin-top: -5rpx;
    }

    .content {
      // border-left: 6rpx solid $topic-color;
      padding-left: 16rpx;
      word-break:break-all;
    }
  }
</style>
