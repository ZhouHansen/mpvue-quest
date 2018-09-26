<template>
  <div class="purchase-container">
    <div class="order-list">
      <div class="order-item">
        <div class="order-item-body" @click="visitOrderDetail">
          <div class="order-id">
            <hoo-have-left-border-title :title="'订单编号：123184'"></hoo-have-left-border-title>
          </div>
          <div class="order-item-status">{{status}}</div>
          <div class="order-item-content">
            <div class="order-item-cover" :style="{background: 'url(' + cover + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
            <div class="order-item-detail">
              <div class="order-item-name">书列表</div>
              <div class="order-item-format">规格</div>
              <div class="order-item-cost">
                <div class="order-price">¥250</div>
                <div class="order-num">1件</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-item-ctrl">取消订单</div>
      </div>
      <div class="order-item">
        <div class="order-item-body" @click="visitOrderDetail">
          <div class="order-id">
            <hoo-have-left-border-title :title="'订单编号：123184'"></hoo-have-left-border-title>
          </div>
          <div class="order-item-status">{{status}}</div>
          <div class="order-item-content">
            <div class="order-item-cover" :style="{background: 'url(' + cover + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
            <div class="order-item-detail">
              <div class="order-item-name">书列表</div>
              <div class="order-item-format">规格</div>
              <div class="order-item-cost">
                <div class="order-price">¥250</div>
                <div class="order-num">1件</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-item-ctrl">取消订单</div>
      </div>
      <div class="order-item">
        <div class="order-item-body" @click="visitOrderDetail">
          <div class="order-id">
            <hoo-have-left-border-title :title="'订单编号：123184'"></hoo-have-left-border-title>
          </div>
          <div class="order-item-status">{{status}}</div>
          <div class="order-item-content">
            <div class="order-item-cover" :style="{background: 'url(' + cover + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
            <div class="order-item-detail">
              <div class="order-item-name">书列表</div>
              <div class="order-item-format">规格</div>
              <div class="order-item-cost">
                <div class="order-price">¥250</div>
                <div class="order-num">1件</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-item-ctrl">取消订单</div>
      </div>
    </div>
  </div>
</template>
<script>
import {PurchaseStatus} from '@/utils/order.status';
import hooHaveLeftBorderTitle from '@/components/left.border.title';

export default {
  components: {
    hooHaveLeftBorderTitle
  },
  props: [],
  data () {
    return {
      cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg',
      status: PurchaseStatus[0].status
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('商品购买');
    console.log(PurchaseStatus[0]);
  },
  methods: {
    visitOrderDetail () {
      this.$router.push({path: '/pages/account.packages/purchase.goods/purchase.detail', query: {id: '12313'}});
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .purchase-container {
    min-height: calc(100vh - 20rpx);
    padding-bottom: 20rpx;
    background-color: #f9f9f9;

    .order-list {
      .order-item {
        margin-top: 20rpx;
        box-shadow: 0 4rpx 8rpx #e8e8e8;
        border-top: 1rpx solid #efefef;
        background-color: #ffffff;

        &:first-child {
          margin-top: 0;
        }

        .order-item-body {
          padding: 40rpx;
          .order-item-status {
            color: $topic-color;
            margin-top: 20rpx;
            margin-left: 24rpx;
          }

          .order-item-content {
            margin-top: 20rpx;
            padding-top: 30rpx;
            border-top: 1rpx solid #eaeaea;
            margin-left: 24rpx;
            @include flex(flex-start, flex-start);

            .order-item-cover {
              width: 140rpx;
              height: 140rpx;
              margin-right: 30rpx;
              flex-shrink: 0;
              border-radius: 16rpx;
            }

            .order-item-detail {
              width: 100%;

              .order-item-name {
                color: #46311E;
                font-size: 16px;
                font-weight: bold;
              }

              .order-item-format {
                color: #9f9f9f;
                font-size: 12px;
              }

              .order-item-cost {
                @include flex();
                color: $topic-color;
              }
            }
          }
        }

        .order-item-ctrl {
          color: #46311E;
          font-size: 16px;
          text-align: center;
          padding: 20rpx 0;
          border-top: 1rpx solid #efefef;
        }
      }
    }
  }
</style>
