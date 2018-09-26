<template>
  <div class="empty-container">
    <img src="../assets/images/ic_empty.png" :mode="'aseptFill'" class="empty-icon" v-if="type === 'normal'">
    <div class="empty-text">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: ['type', 'text']
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .empty-container {
    text-align: center;
    margin-top: 200rpx;

    .empty-icon {
      width: 424rpx;
      height: 276rpx;
    }

    .empty-text {
      font-size: 16px;
      color: #9f9f9f;
      margin-top: 40rpx;
    }
  }
</style>
