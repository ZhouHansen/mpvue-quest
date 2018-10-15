<template>
  <div class="payment-result-container">
    <div class="result-content">
      <image :src="iconUrl" :mode="'aspectFit'" class="result-icon" />
      <div class="result-type">{{type === 'success'? '支付成功' : '网络出错'}}</div>
      <div class="result-tips" v-if="type === 'success'">请您提前联系机构了解相关课程准备，祝您学习愉快！</div>
      <div class="result-tips" v-if="type === 'wrong'">请确保手机连接网络或Wi-Fi，并刷新重试！</div>
    </div>

    <div class="result-ctrl success" v-if="type === 'success'">
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic-unchecked'" :text="'查看订单'"></hoo-button>
      </div>
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic'" :text="'返回首页'"></hoo-button>
      </div>
    </div>
    <div class="result-ctrl wrong" v-if="type === 'wrong'">
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic'" :text="'刷新重试'"></hoo-button>
      </div>
    </div>
  </div>
</template>
<script>
  import hooButton from '@/components/button';

  export default {
    components: {
      hooButton
    },
    // props: ['type'],
    data () {
      return {
        type: 'wrong'
      };
    },
    computed: {
      iconUrl () {
        if (this.type === 'success') {
          return require('../../assets/images/ic_go_well.png');
        } else {
          return require('../../assets/images/ic_go_wrong.png');
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .payment-result-container {
    background-color: #f9f9f9;
    min-height: 100vh;

    .result-content {
      border: 40rpx solid #f9f9f9;
      width: calc(100vw - 160rpx);
      background-color: #ffffff;
      padding: 80rpx 40rpx;
      border-radius: 16rpx;
      text-align: center;

      .result-icon {
        width: 150rpx;
        height: 150rpx;
        display: inline-block;
      }

      .result-type {
        margin-top: 40rpx;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      .result-desc {
        margin-top: 24rpx;
        text-align: center;
      }
    }

    .result-ctrl {
      @include flex(center);
      padding: 0 40rpx;
    }

    .success {
        .ctrl-btn-item {
          flex-basis: 47%;

          &:first-child {
            margin-right: 6%;
          }
        }
      }

    .wrong {
      .ctrl-btn-item {
        flex-basis: 50%;
      }
    }
  }
</style>
