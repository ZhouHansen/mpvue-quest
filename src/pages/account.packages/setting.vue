<template>
  <div class="setting-container">
    <div class="setting-list">
      <div class="setting-item" @click="visitAuth">
        <div class="setting-item-content">
          <div class="setting-item-title">权限设置</div>
          <div class="setting-item-value">应用权限有关</div>
        </div>
        <div class="setting-item-icon"></div>
      </div>

      <div class="setting-item" @click="visitFeedback">
        <div class="setting-item-content">
          <div class="setting-item-title">意见反馈</div>
          <div class="setting-item-value">任何疑问请留言</div>
        </div>
        <div class="setting-item-icon"></div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: [],
  data () {
    return {
      addressData: null
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('设置');
    // this.getAddressDefault();
  },
  methods: {
    getAddressDefault () {
      this.$network.account.getDefaultAddress().then(res => {
        console.log(res);
        this.addressData = res.data;
      });
    },

    visitAuth () {
      this.$wxUtils.setAuth();
      // wx.openSetting({
      //   success: (res) => {
      //     /*
      //       * res.authSetting = {
      //       *   "scope.userInfo": true,
      //       *   "scope.userLocation": true
      //       * }
      //       */
      //     console.log(res);

      //     if (res.authSetting['scope.userLocation']) {
      //       this.$wxUtils.getLocation().then(res => {
      //         GetAddressUseLngLat(res);
      //       });
      //       // 当打开小程序时，没有进行定位授权，都会打开设置页面，授权成功之后，重新加载此页面
      //     }
      //   }
      // });
    },

    visitFeedback () {
      this.$router.push('/pages/account.packages/feedback');
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .setting-container {
    .setting-list {
      border-top: 1rpx solid #e8e8e8;
    }

    .setting-item {
      padding: 40rpx 40rpx 40rpx 100rpx;
      border-bottom: 1rpx solid #e8e8e8;
      @include flex();

      .setting-item-title {
        color: #000000;
        font-size: 16px;
        font-weight: bold;
      }

      .setting-item-icon {
        width: 34rpx;
        height: 34rpx;
        flex-shrink: 0;
        @include backgroundImg('../../assets/images/arrow_right.png');
      }
    }
  }
</style>
