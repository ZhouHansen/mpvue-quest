<template>
  <span class="tips-container">
    <span class="item-label-desc"  @click="showDesc"></span>
    <div v-if="show && defaultShow" class="tips-popup" @click="showDesc">{{text}}</div>
    <!-- <div v-if="show && defaultShow" class="tips-popup" :style="'left:'+ popupLeft +'px; top:' + popupTop + 'px;'">{{text}}</div> -->
  </span>
</template>
<script>
// let timeout = null;
export default {
  props: ['text', 'show'],
  data () {
    return {
      popupLeft: null,
      popupTop: null,
      timeout: null
    };
  },
  computed: {
    defaultShow () {
      if (!this.timeout && this.show) {
        this.timeoutFn();
      }
      return this.show;
    }
  },
  methods: {
    showDesc (e) {
      this.defaultShow = !this.defaultShow;
      this.show = !this.show;

      // console.log(e);
      // this.popupLeft = e.mp.currentTarget.offsetLeft - 30;
      // this.popupTop = e.mp.currentTarget.offsetTop - 35;
      if (this.timeout) {
        clearTimeout(this.timeout);
        if (this.show) {
          this.timeoutFn();
        }
      } else {
        this.timeoutFn();
      }
    },

    timeoutFn () {
      this.timeout = setTimeout(() => {
        console.log('over');
        this.defaultShow = false;
        this.show = false;
        this.timeout = null;
      }, 5000);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .tips-container {
    position: relative;

    .item-label-desc {
      display: inline-block;
      width: 28rpx;
      height: 28rpx;
      margin-left: 6rpx;
      @include backgroundImg('../assets/images/ic_info.png');
    }

    .tips-popup {
      // position: fixed;
      position: absolute;
      top: -70rpx;
      left: -20rpx;
      min-width: 50vw;
      text-align: center;

      z-index: 99;
      box-shadow: 0 4rpx 8rpx #c7c7c7;
      border-radius: 14rpx;
      padding: 10rpx 20rpx;
      font-size: 12px;
      color: #4c4c4c;
      background-color: #ffffff;
      // @include backgroundImg('../assets/images/popup_ic.png');
    }

  }
</style>
