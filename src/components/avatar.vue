<template>
  <img class="avatar-container" :class="size" :src="avatarUrl" v-if="avatarUrl">
  <!-- <div class="avatar-container" :class="size" v-if="avatarUrl" :style="{background: 'url(' + avatarUrl + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div> -->
</template>

<script>
export default {
  props: ['type', 'avatar'],
  mounted () {
  },
  data () {
    return {
      // avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png'
    };
  },
  computed: {
    size () {
      if (this.type === 'big') {
        return 'big';
      } else {
        return 'small';
      }
    },

    avatarUrl () {
      if (!this.avatar) {
        return 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png';
      } else {
        return this.avatar;
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
