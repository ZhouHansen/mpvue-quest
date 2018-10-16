<template>
  <div class="setting-container">
    <div class="setting-list">
      <div class="setting-item" @click="visitAddress">
        <div class="setting-item-content">
          <div class="setting-item-title">收货地址</div>
          <div class="setting-item-value">{{addressData ? addressData.prov + addressData.city + addressData.district + addressData.address : '设置收货地址'}}</div>
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
      addressData: {}
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('设置');
    this.getAddressDefault();
  },
  methods: {
    getAddressDefault () {
      this.$network.account.getAddressList().then(res => {
        console.log(res);
        this.addressData = res.data[0];
      });
    },

    visitAddress () {
      this.$router.push('/pages/account.packages/setting/setting.address');
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
