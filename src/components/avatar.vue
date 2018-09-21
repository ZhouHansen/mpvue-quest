<template>
  <div class="avatar-container" :class="size" v-if="avatar" :style="{background: 'url(' + avatar + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
</template>

<script>
export default {
  props: ['type'],
  mounted () {
  },
  data () {
    return {
      avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png'
    };
  },
  computed: {
    size () {
      if (this.type === 'big') {
        return 'big';
      } else {
        return 'small';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .avatar-container {
    border-radius: 100%;
  }

  .small {
    width: 100rpx;
    height: 100rpx;
  }

  .big {
    width: 140rpx;
    height: 140rpx;
  }
</style>
