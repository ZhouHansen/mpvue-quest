<template>
  <div class="payment-result-container" v-if="type">
    <div class="result-content">
      <image :src="iconUrl" :mode="'aspectFit'" class="result-icon" />
      <div class="result-type">{{type === 'success'? '支付成功' : '支付失败'}}</div>
      <div class="result-tips" v-if="type === 'success' && text">{{text}}</div>
      <div class="result-tips" v-if="type === 'wrong' && text">{{text}}</div>
    </div>

    <div class="result-ctrl success" v-if="type === 'success'">
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic-unchecked'" :text="'查看订单'" @tapButton="visitOrder"></hoo-button>
      </div>
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic'" :text="'返回首页'" @tapButton="goHomePage"></hoo-button>
      </div>
    </div>
    <div class="result-ctrl wrong" v-if="type === 'wrong'">
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic-unchecked'" :text="'返回'" @tapButton="goBack"></hoo-button>
      </div>
      <div class="ctrl-btn-item">
        <hoo-button :type="'topic'" :text="'刷新重试'" @tapButton="payment"></hoo-button>
      </div>
    </div>
  </div>
</template>
<script>
  import WxNetwork from '@/network/network.wx';
  import hooButton from '@/components/button';

  export default {
    components: {
      hooButton
    },
    data () {
      return {
        type: null,
        text: '',
        order: null
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
    },
    mounted () {
      // order 中包括 payId orderId  type(product or lesson)
      let params = JSON.parse(this.$route.query.obj);

      this.type = params.type;
      this.text = params.text;
      this.order = params.order;
    },
    methods: {
      getOrderDetail () {
        // 获取订单详情
      },

      goBack () {
        this.$router.back();
      },

      payment () {
        let params = {
          sign: this.order.payId,
          cb: this.updateOrder
        };
        WxNetwork.wxPayment(params);
      },

      updateOrder (e) {
        if (e.status) {
          this.$network.account.updateOrder({}, null, 'weapp/order/pay/' + this.orderId).then(res => {
            this.type = 'success';
            if (this.order.type === 'product') {
              this.text = '等待商家确认发货';
            } else {
              this.text = '请您提前联系机构了解相关课程准备，祝您学习愉快！';
            }
            this.getOrderDetail();
          });
        }
      },

      visitOrder () {
        let orderObj = {

        };

        if (this.order.type === 'product') {
          this.$router.replace({path: '/pages/account.packages/purchase.goods/purchase.detail', query: {obj: JSON.stringify(orderObj)}});
        } else {
          this.$router.replace({path: '/pages/account.packages/course.calendar/course.order', query: {obj: JSON.stringify(orderObj)}});
        }
      },

      goHomePage () {
        this.$router.push({path: '/pages/index/index', isTab: true});
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
        flex-basis: 47%;

        &:first-child {
          margin-right: 6%;
        }
      }
    }
  }
</style>
