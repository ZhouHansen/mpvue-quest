<template>
  <div class="linkhome-container" @click="visitHome" >
    <span class="linkhome-icon"></span>
    <span>回到首页</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    };
  },
  methods: {
    visitHome () {
      this.$router.push({ path: '/pages/index/index', isTab: true });
    }
  }
};
</script>
<style lang="scss" scoped>

  @import '../assets/style/variables.scss';

  .linkhome-container {
    position: fixed;
    right: -10rpx;
    top: 20rpx;
    z-index: 99;
    background-color: $topic-color;
    color: #ffffff;
    padding: 10rpx 20rpx 10rpx 60rpx;
    border-radius: 10rpx;

    .linkhome-icon {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 60rpx;
      @include backgroundImg('../assets/images/arrow_left.png');
    }
  }
</style>
