<template>
  <div class="avatar-container" v-if="avatar" :style="{background: 'url(' + avatar + ') no-repeat', backgroundSize: 'cover'}"></div>
</template>

<script>
export default {
  // props: ['avatar'],
  mounted () {
  },
  data () {
    return {
      avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png'
    };
  }
};
</script>

<style>
  .avatar-container {
    width: 100rpx;
    height: 100rpx;
    border-radius: 100%;
  }
</style>
