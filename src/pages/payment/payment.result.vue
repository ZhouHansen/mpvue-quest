<template>
  <div class="payment-result-container" v-if="type">
    <div class="result-content">
      <image :src="iconUrl" :mode="'aspectFit'" class="result-icon" />
      <div class="result-type">{{titleText}}</div>
      <div class="result-tips" v-if="type === 'success' && text && !group">{{text}}</div>
      <div class="result-tips" v-if="type === 'wrong' && text">{{text}}</div>
      <div class="result-group" v-if="group && type === 'success'">
        <div class="result-group-text">你还可以邀请朋友一起参加</div>
        <div class="share-list">
          <div class="share-item wechat">
            <button :open-type="'share'" :plain="'true'">
              <div class="share-item-icon"></div>
              <div class="share-item-text">微信朋友</div>
            </button>
          </div>
          <!-- <div class="share-item wechat-zone">
            <div class="share-item-icon"></div>
            <div class="share-item-text">朋友圈</div>
          </div> -->
        </div>
      </div>
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
        order: null,
        orderDetail: null,
        group: false
      };
    },
    computed: {
      iconUrl () {
        if (this.type === 'success') {
          return require('../../assets/images/ic_go_well.png');
        } else {
          return require('../../assets/images/ic_go_wrong.png');
        }
      },

      titleText () {
        let title = '';

        if (this.type === 'success') {
          if (this.title) {
            title = this.title;
          } else {
            title = '支付成功';
          }
        } else {
          title = '支付失败';
        }

        this.$wxUtils.setNavTitle(title);

        return title;
      }
    },
    mounted () {
      // order 中包括 payId orderId  type(product or lesson)
      let params = JSON.parse(this.$route.query.obj);
      console.log(params);

      this.type = params.type;
      this.text = params.text;
      this.order = params.order;
      this.title = params.titleText;
      this.group = params.group;
    },
    methods: {
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
          });
        }
      },

      visitOrder () {
        if (this.order.type === 'product') {
          this.$router.replace({path: '/pages/account.packages/purchase.goods/purchase.detail', query: {id: this.order.orderId}});
        } else {
          this.$router.replace({path: '/pages/account.packages/course.calendar/course.order', query: {id: this.order.orderId}});
        }
      },

      goHomePage () {
        this.$router.push({path: '/pages/index/index', isTab: true});
      }
    },

    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log('转发参数', res);
      }
      let title = '';
      if (this.order.type === 'lesson') {
        title = '和我们参加“' + this.order.product.name + '”吧！';
      } else {
        title = '和我们一起购买“' + this.order.product.name + '”吧！';
      }

      return {
        title: title,
        path: '/pages/home/section.detail?type=' + this.order.type + '&id=' + this.order.product.id,
        imageUrl: this.order.product.cover
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .payment-result-container {
    background-color: #f9f9f9;
    min-height: calc(100vh - 40rpx);
    padding-top: 40rpx;

    .result-content {
      margin: 0 40rpx 40rpx 40rpx;
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

      .result-group {
        border-top: 1rpx solid #f4f4f4;
        margin-top: 40rpx;
        padding: 26rpx 0 40rpx;

        .result-group-text {
          color: #9D9D9D;
        }

        .share-list {
          @include flex(center, center);

          .share-item {
            margin-right:10vw;

            &:last-child {
              margin-right: 0;
            }

            button {
              border: 0;
            }
          }
        }

        .share-item-icon {
          margin: 52rpx auto 0;
          width: 84rpx;
          height: 84rpx;
        }

        .share-item-text {
          color: #D3D3D3;
          font-size: 12px;
          margin-top: 18rpx;
          text-align: center;
        }

        .wechat .share-item-icon{
          @include backgroundImg('../../assets/images/ic_share_wechat@2x.png');
        }

        .wechat-zone .share-item-icon{
          @include backgroundImg('../../assets/images/ic_share_pyq@2x.png');
        }
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
