<template>
  <div class="course-order-container">
    <div class="order-status">{{orderStatus.status}}</div>
    <div class="address-detail">
      <hoo-have-left-border-title :title="'收货地址'"></hoo-have-left-border-title>
      <div class="address-content">
        <div class="address-title">北京朝阳区蓝河大厦23号</div>
        <div class="address-inf">
          <span class="address-name">孙俪</span>
          <span class="address-phone">17645091513</span>
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
          <div class="order-detail-item-text">¥198</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">数量</div>
          <div class="order-detail-item-text">x2</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">总计</div>
          <div class="order-detail-item-text">396元</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">支付方式</div>
          <div class="order-detail-item-text">微信支付</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">支付时间</div>
          <div class="order-detail-item-text">2018-09-10 12:09:30</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">订单编号</div>
          <div class="order-detail-item-text">217391392193</div>
        </div>
      </div>
    </div>

    <div class="purchase-content order-detail">
      <hoo-have-left-border-title :title="'购买内容'"></hoo-have-left-border-title>
      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="order-detail-item-label">
            <div class="content-cover" :style="{background: 'url(' + cover + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
          </div>
          <div class="order-detail-item-text">2018招牌通识营-在创造中原力觉醒</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">产品规格</div>
          <div class="order-detail-item-text">32册</div>
        </div>
      </div>
    </div>

    <div class="organi-detail">
      <hoo-have-left-border-title :title="'机构信息'"></hoo-have-left-border-title>
      <div class="organi-content">
        <organi-item></organi-item>
      </div>
    </div>

    <div class="footer">
      <hoo-button :text="'去付款'" :type="'topic'" v-if="orderStatus.ctrl === 'payment'"></hoo-button>
      <hoo-button :text="'取消订单'" :type="'normal'" v-if="orderStatus.ctrl === 'cancel'"></hoo-button>
      <div class="footer-list" v-if="orderStatus.ctrl === 'confirm'">
        <hoo-button :text="'查看物流'" :type="'normal'"></hoo-button>
        <hoo-button :text="'确认收货'" :type="'topic'"></hoo-button>
      </div>
      <hoo-button :text="'去评价'" :type="'topic'" v-if="orderStatus.ctrl === 'appraisal'"></hoo-button>
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
      orderStatus: PurchaseStatus[1]
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('课程订单详情');
  },
  computed: {
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
