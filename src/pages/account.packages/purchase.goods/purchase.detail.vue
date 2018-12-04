<template>
  <div class="course-order-container" v-if="orderDetail">
    <div class="order-status" v-if="orderDetail.resultPayStatus && orderDetail.resultPayStatus.text">{{orderDetail.resultPayStatus.text}}</div>
    <div class="address-detail" v-if="orderDetail.address">
      <hoo-have-left-border-title :title="'收货地址'"></hoo-have-left-border-title>
      <div class="address-content">
        <div class="address-title">{{orderDetail.address.prov}}{{orderDetail.address.city}}{{orderDetail.address.district}}{{orderDetail.address.address}}</div>
        <div class="address-inf">
          <span class="address-name">{{orderDetail.address.name}}</span>
          <span class="address-phone">{{orderDetail.address.cell}}</span>
        </div>
      </div>
    </div>

    <div class="express-detail" @click="copyOrderNum" v-if="orderDetail.loginfo">
      <hoo-have-left-border-title :title="'物流信息'"></hoo-have-left-border-title>
      <div class="express-content">
        {{orderDetail.loginfo.no || '暂无物流信息'}}
      </div>
    </div>

    <div class="order-detail">
      <hoo-have-left-border-title :title="'订单信息'"></hoo-have-left-border-title>
      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="order-detail-item-label">单价</div>
          <div class="order-detail-item-text">¥{{orderDetail.price / 100}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">数量</div>
          <div class="order-detail-item-text">x{{orderDetail.count}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">总计</div>
          <div class="order-detail-item-text">{{orderDetail.price * orderDetail.count / 100}}元</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">支付方式</div>
          <div class="order-detail-item-text">微信支付</div>
        </div>
        <div class="order-detail-item" v-if="orderDetail.resultPayStatus.id === 'alreadyPayWaitDelivery'">
          <div class="order-detail-item-label">支付时间</div>
          <div class="order-detail-item-text">{{orderDetail.paidat}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">订单编号</div>
          <div class="order-detail-item-text">{{orderDetail.orderno}}</div>
        </div>
      </div>
    </div>

    <div class="purchase-content order-detail">
      <hoo-have-left-border-title :title="'购买内容'"></hoo-have-left-border-title>
      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="order-detail-item-label">
            <div class="content-cover" :style="{background: 'url(' + orderDetail.product.coverfile + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
          </div>
          <div class="order-detail-item-text">{{orderDetail.product.name}}</div>
        </div>
        <!-- <div class="order-detail-item" v-if="orderDetail.product.specText">
          <div class="order-detail-item-label">产品规格</div>
          <div class="order-detail-item-text">{{orderDetail.product.specText}}</div>
        </div> -->
      </div>
    </div>

    <div class="organi-detail" v-if="orderDetail.product.instid">
      <hoo-have-left-border-title :title="'机构信息'"></hoo-have-left-border-title>
      <div class="organi-content">
        <organi-item :organiData="orderDetail.product"></organi-item>
      </div>
    </div>

    <div class="footer">
      <div class='button-item' v-if="orderDetail.resultPayStatus.id === 'waitPayment'">
        <hoo-button :text="'去付款'" :type="'topic-formId'" @tapButton="getPayParams"></hoo-button>
      </div>
      <div class='button-item' v-if="orderDetail.resultPayStatus.id === 'waitPayment'">
        <hoo-button :text="'取消订单'" :type="'normal'" @tapButton="cancelOrder"></hoo-button>
      </div>
      <div class='button-item' v-if="orderDetail.resultPayStatus.id === 'waitAppraisal'">
        <hoo-button :text="'复制物流单号'" :type="'normal'" @tapButton="copyOrderNum"></hoo-button>
      </div>
      <div class='button-item' v-if="orderDetail.resultPayStatus.id === 'waitAppraisal'">
        <hoo-button :text="'去评价'" :type="'topic'" @tapButton="visitAppraisal"></hoo-button>
      </div>
      <!-- <div class='button-item'>
        <hoo-button :text="'联系客服'" :type="'normal'" v-if="orderDetail.resultPayStatus.id === 'end'"></hoo-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import {ProductSpecData, PurchaseStatus, GetDataObjUseId} from '@/utils/default.data';
import WxNetwork from '@/network/network.wx';
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooButton from '@/components/button';
import organiItem from '@/components/organization';

export default {
  components: {
    hooHaveLeftBorderTitle,
    hooButton,
    organiItem
  },
  props: [''],
  data () {
    return {
      orderDetail: null
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('商品订单详情');
  },
  onShow () {
    this.$wxUtils.loading({title: '加载中...'});
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail () {
      // 获取订单详情
      this.$network.account.getOrderDetail({}, null, 'weapp/order/' + this.$route.query.id).then(res => {
        this.$wxUtils.loading({show: false});
        let firstFormat = res.data;

        firstFormat.address = JSON.parse(firstFormat.address);

        if (firstFormat.extra) {
          firstFormat.extra = JSON.parse(firstFormat.extra);
        }

        let result = GetDataObjUseId(ProductSpecData, firstFormat.product.spec);

        if (result) {
          firstFormat.product.specText = result.text;
        }

        this.orderDetail = firstFormat;
        // console.log(this.orderDetail);
        this.setPayStatus();
      });
    },

    setPayStatus () {
      let payResult = null;
      if (this.orderDetail.paystate === 0 && this.orderDetail.status === 0) {
        payResult = GetDataObjUseId(PurchaseStatus, 'waitPayment');
      } else
      if (this.orderDetail.paystate === 0 && this.orderDetail.status === 1) {
        payResult = GetDataObjUseId(PurchaseStatus, 'timeEnd');
      } else
      if (this.orderDetail.paystate === 1 && !this.orderDetail.loginfo.no) {
        payResult = GetDataObjUseId(PurchaseStatus, 'alreadyConfirm');
      } else
      if (this.orderDetail.paystate === 1 && this.orderDetail.loginfo.no && this.orderDetail.commented === 0) {
        payResult = GetDataObjUseId(PurchaseStatus, 'waitAppraisal');
      } else
      if (this.orderDetail.commented === 1) {
        payResult = GetDataObjUseId(PurchaseStatus, 'end');
      } else
      if (this.orderDetail.paystate === 3) {
        payResult = GetDataObjUseId(PurchaseStatus, 'timeEnd');
      } else {
        payResult = GetDataObjUseId(PurchaseStatus, 'end');
      }
      // console.log(payResult);
      this.orderDetail.resultPayStatus = payResult;
    },

    cancelOrder () {
      this.$wxUtils.showModal({title: '确定取消订单？'}).then(res => {
        if (res) {
          this.$network.account.cancelOrder({}, null, 'weapp/order/cancel/' + this.orderDetail.id).then(res => {
            if (res.e === 0) {
              this.$wxUtils.toast({title: '取消成功'});
              setTimeout(() => {
                this.$router.back();
              }, 2000);
            } else {
              this.$wxUtils.toast({title: res.msg});
            }
          });
        }
      });
    },

    visitAppraisal () {
      let params = {
        productId: this.orderDetail.product.id,
        instId: this.orderDetail.product.instid,
        orderno: this.orderDetail.orderno
      };

      this.$router.push({path: '/pages/account.packages/purchase.goods/purchase.appraisal', query: {obj: JSON.stringify(params)}});
    },

    getPayParams () {
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.account.getPaymentParams({}, null, 'weapp/order/pay/' + this.orderDetail.orderno).then(res => {
        this.$wxUtils.loading({show: false});
        if (res.data.prepayid) {
          this.runWxPayment(res.data.prepayid);
        } else {
          this.$wxUtils.toast({title: '下单失败，未获取到微信支付订单号'});
        }
      });
    },

    runWxPayment (sign) {
      let params = {
        sign: sign,
        cb: this.updateOrder
      };
      WxNetwork.wxPayment(params);
    },

    updateOrder (e) {
      if (e.status) {
        this.$network.account.updateOrder({}, null, 'weapp/order/pay/' + this.orderDetail.orderno).then(res => {
          this.getOrderDetail();
        });
      }
    },

    copyOrderNum () {
      if (this.orderDetail.loginfo.no) {
        this.$wxUtils.setClipboardData(this.orderDetail.loginfo.no);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .course-order-container {
    min-height: 100vh;
    background-color: #f9f9f9;

    @mixin section () {
      margin-top: 20rpx;
      background-color: #ffffff;
      padding: 40rpx;
    }

    .order-status {
      background-color: $topic-color;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      padding: 15rpx 0;
    }

    .order-detail {
      padding: 40rpx;
      background-color: #ffffff;
      margin-top: 20rpx;

      .order-detail-list {
        .order-detail-item {
          word-break:break-all;
          margin-top: 30rpx;
          font-size: 16px;
          @include flex(flex-start, flex-start);

          .order-detail-item-label {
            color: #bfbfbf;
            flex-basis: 35%;
            flex-shrink: 0;
          }

          .order-detail-item-text {
            color: #000000;
          }
        }
      }
    }

    .purchase-content {
      margin-top: 20rpx;
      background-color: #ffffff;

      .content-cover {
        width: 120rpx;
        height: 120rpx;
        border-radius: 16rpx;
        border: 1rpx solid red;
      }
    }

    .user-detail {
      @include section();
    }

    .address-detail {
      padding: 40rpx;
      background-color: #ffffff;

      .address-content {
        margin-left: 24rpx;
      }

      .address-title {
        font-size: 18px;
        color: #000000;
        margin-top: 30rpx;
      }

      .address-name {
        margin-right: 30rpx;
      }
    }

    .express-detail {
      @include section();

      .express-content {
        font-size: 18px;
        color: #000000;
        margin-top: 30rpx;
        margin-left: 24rpx;
      }
    }



    .organi-detail {
      @include section();

      .organi-content {
        margin-top: 30rpx;
      }
    }

    .footer {
      margin: 0 40rpx;
      padding: 40rpx 0;
      width: calc(100vw - 80rpx);

      .button-item {
        margin-top: 20rpx;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
</style>
