<template>
  <span class="tips-container">
    <span class="item-label-desc"  @click="showDesc"></span>
    <div v-show="show" class="tips-popup" :style="'left:'+ popupLeft +'px; top:' + popupTop + 'px;'">{{text}}</div>
  </span>
</template>
<script>
export default {
  props: ['text'],
  data () {
    return {
      show: false,
      popupLeft: null,
      popupTop: null
    };
  },
  methods: {
    showDesc (e) {
      this.show = !this.show;
      console.log(e);
      this.popupLeft = e.mp.currentTarget.offsetLeft - 30;
      this.popupTop = e.mp.currentTarget.offsetTop - 35;

      setTimeout(() => {
        this.show = false;
      }, 5000);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .tips-container {

    .item-label-desc {
      display: inline-block;
      width: 28rpx;
      height: 28rpx;
      margin-left: 6rpx;
      @include backgroundImg('../assets/images/ic_info.png');
    }

    .tips-popup {
      position: fixed;
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
