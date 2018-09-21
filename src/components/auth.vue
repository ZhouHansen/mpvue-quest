<template>
  <div class="auth-container">
    <div class="auth">
      <span class="auth-icon"></span>
      <span class="auth-text">已认证</span>
    </div>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .auth-container {
    .auth {
      display: inline-block;
      font-size: 12px;
      color: $topic-color;

      .auth-icon {
        background: url('../assets/images/check-circle-fill.png') no-repeat 50% 50%;
        background-size: contain;
        display: inline-block;
        width: 28rpx;
        height: 28rpx;
        vertical-align:text-top;
      }

      .auth-text {
        vertical-align:middle;
      }
    }
  }
</style>
