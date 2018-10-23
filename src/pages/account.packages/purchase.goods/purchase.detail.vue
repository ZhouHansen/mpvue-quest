<template>
  <div class="course-order-container" v-if="orderDetail">
    <div class="order-status">{{orderStatus.status}}</div>
    <div class="address-detail">
      <hoo-have-left-border-title :title="'收货地址'"></hoo-have-left-border-title>
      <div class="address-content">
        <div class="address-title">{{orderDetail.address.prov}}{{orderDetail.address.city}}{{orderDetail.address.district}}{{orderDetail.address.address}}</div>
        <div class="address-inf">
          <span class="address-name">{{orderDetail.address.name}}</span>
          <span class="address-phone">{{orderDetail.address.cell}}</span>
        </div>
      </div>
    </div>

    <div class="express-detail">
      <hoo-have-left-border-title :title="'物流信息'"></hoo-have-left-border-title>
      <div class="express-content">
        暂无物流信息
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
        <div class="order-detail-item">
          <div class="order-detail-item-label">支付时间</div>
          <div class="order-detail-item-text">{{orderDetail.issueat}}</div>
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
            <div class="content-cover" :style="{background: 'url(' + orderDetail.product.coverfile2 + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
          </div>
          <div class="order-detail-item-text">{{orderDetail.product.name}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">产品规格</div>
          <div class="order-detail-item-text">32册</div>
        </div>
      </div>
    </div>

    <div class="organi-detail" v-if="orderDetail.product.instid">
      <hoo-have-left-border-title :title="'机构信息'"></hoo-have-left-border-title>
      <div class="organi-content">
        <organi-item :organiData="orderDetail.product"></organi-item>
      </div>
    </div>

    <div class="footer">
      <hoo-button :text="'去付款'" :type="'topic'" v-if="orderStatus.ctrl === 'payment'"></hoo-button>
      <hoo-button :text="'取消订单'" :type="'normal'" v-if="orderStatus.ctrl === 'cancel'" @click="cancelOrder"></hoo-button>
      <div class="footer-list" v-if="orderStatus.ctrl === 'confirm'">
        <hoo-button :text="'查看物流'" :type="'normal'"></hoo-button>
        <hoo-button :text="'确认收货'" :type="'topic'"></hoo-button>
      </div>
      <hoo-button :text="'去评价'" :type="'topic'" v-if="orderStatus.ctrl === 'appraisal'" @tapButton="visitAppraisal"></hoo-button>
      <hoo-button :text="'联系客服'" :type="'normal'" v-if="orderStatus.ctrl === 'customerServer'"></hoo-button>
    </div>
  </div>
</template>
<script>
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooButton from '@/components/button';
import organiItem from '@/components/organization';
import {PurchaseStatus} from '@/utils/order.status';

export default {
  components: {
    hooHaveLeftBorderTitle,
    hooButton,
    organiItem
  },
  props: [''],
  data () {
    return {
      cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png',
      orderStatus: {},
      orderDetail: null
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('商品订单详情');
    this.getOrderDetail();
  },
  computed: {
  },
  methods: {
    getOrderDetail () {
      let firstFormat = JSON.parse(this.$route.query.obj);

      firstFormat.address = JSON.parse(firstFormat.address);

      if (firstFormat.extra) {
        firstFormat.extra = JSON.parse(firstFormat.address);
      }

      this.orderDetail = firstFormat;

      // this.orderStatus = PurchaseStatus[this.orderDetail.paystate];
      this.orderStatus = PurchaseStatus[0];
      console.log(this.orderDetail);
    },

    cancelOrder () {
      this.$network.account.cancelOrder({}, null, 'weapp/order/cancel/' + this.orderDetail.id).then(res => {
        if (res.e === 0) {
          this.$wxUtils.toast({title: '取消成功'});
          setTimeout(() => {
            this.$router.back();
          }, 2000);
        } else {
          this.$wxUtils.toast(res.message);
        }
      });
    },

    visitAppraisal () {
      this.$router.push({path: '/pages/account.packages/purchase.goods/purchase.appraisal', obj: JSON.stringify(this.orderDetail)});
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
    }
  }
</style>
