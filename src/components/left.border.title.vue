<template>
  <div class="have-left-topic-border-container">
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
    .content {
      border-left: 6rpx solid $topic-color;
      padding-left: 16rpx;
    }
  }
</style>
