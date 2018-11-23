<template>
  <div class="purchase-container">
    <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
      <div class="order-list" v-if="goods">
        <div class="order-item" v-for="item in goods" :key="item.id">
          <div class="order-item-body">
            <div class="order-id">
              <hoo-have-left-border-title :title="'下单时间：' + item.issueat"></hoo-have-left-border-title>
            </div>
            <div class="order-item-status">{{item.resultPayStatus.text}}</div>
            <div class="order-item-content" @click="visitOrderDetail(item.orderno)">
              <div class="order-item-cover" :style="{background: 'url(' + item.product.coverfile2 + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
              <div class="order-item-detail">
                <div class="order-item-name">{{item.product.name}}</div>
                <!-- <div class="order-item-format">{{item.product.agesText}}</div> -->
                <div class="order-item-cost">
                  <div class="order-price">¥{{item.price / 100}}</div>
                  <div class="order-num">{{item.count}}件</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <hoo-empty v-if="!goods || goods.length === 0" :type="'normal'" :text="'没有购买信息～'"></hoo-empty>
    <div class="puchase-footer">
      <div class="footer-item" @click="visitCourseHistory">
        <div>历史记录</div>
      </div>
      <div class="footer-item" @click="visitCourseWaitpay">
        <div>待支付</div>
      </div>
      <!-- <div class="footer-item" @click="visitCourseWaitappr">
        <div>待评价</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import {PurchaseStatus, GetDataObjUseId} from '@/utils/default.data';
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooEmpty from '@/components/empty';

export default {
  components: {
    hooHaveLeftBorderTitle,
    hooEmpty
  },
  props: [],
  data () {
    return {
      total: 0,
      offset: 0,
      limit: 15,
      goods: null
    };
  },
  mounted () {
    // this.$wxUtils.setNavTitle('商品购买');
    this.getGoods();
  },
  methods: {
    refreshParams () {
      this.totla = 0;
      this.offset = 0;
      this.goods = null;
    },

    getGoods () {
      let params = {
        limit: this.limit,
        offset: this.offset,
        paystate: 1
      };
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.account.getCourseList(params, null, 'weapp/orders/product').then(res => {
        // console.log(res);
        if (!this.goods) {
          this.goods = [];
        }

        let arr = this.goods.concat(res.data);
        arr.forEach((item, index) => {
          // // 设置规格
          // let result = GetDataObjUseId(ProductSpecData, item.product.spec);
          // if (result) {
          //   item.product.agesText = result.text;
          // }

          // 判断订单状态
          let payResult = null;

          if (item.paystate === 1 && !item.logino) {
            payResult = GetDataObjUseId(PurchaseStatus, 'alreadyConfirm');
          } else
          if (item.paystate === 1 && item.status === 0 && item.commented === 0 && item.logino) {
            payResult = GetDataObjUseId(PurchaseStatus, 'waitConfirm');
          } else
          if (item.status === 1 && item.commented === 0 && item.logino) {
            payResult = GetDataObjUseId(PurchaseStatus, 'waitAppraisal');
          } else
          if (item.status === 0 && item.paystate === 0) {
            payResult = GetDataObjUseId(PurchaseStatus, 'waitPayment');
          } else
          if (item.status === 0 && item.commented === 1 && item.paystate === 1) {
            payResult = GetDataObjUseId(PurchaseStatus, 'end');
          } else
          if (item.paystate === 3) {
            payResult = GetDataObjUseId(PurchaseStatus, 'timeEnd');
          }

          item.resultPayStatus = payResult;
        });

        this.total = res.total;
        this.goods = arr;
        this.$wxUtils.loading({show: false});
        this.$emit('sendOrderLength', {id: 'puchase', num: res.total});
      });
    },

    visitOrderDetail (e) {
      this.$router.push({path: '/pages/account.packages/purchase.goods/purchase.detail', query: {id: e}});
    },

    visitCourseHistory () {
      this.$router.push('/pages/account.packages/purchase.goods/purchase.history');
    },

    visitCourseWaitpay () {
      this.$router.push('/pages/account.packages/purchase.goods/purchase.waitpay');
    },

    visitCourseWaitappr () {
      this.$router.push('/pages/account.packages/purchase.goods/purchase.waitappr');
    },

    loadMore () {
      if (this.total > this.offset + this.limit) {
        this.offset = this.offset + this.limit;
        this.getGoods();
      }
    }
  }
  // onReachBottom () {
  //   if (this.total > this.offset + this.limit) {
  //     this.offset = this.offset + this.limit;
  //     this.getGoods();
  //   }
  // }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .purchase-container {
    min-height: calc(100vh - 130rpx);
    padding-bottom: 20rpx;
    background-color: #f9f9f9;

    scroll-view {
      max-height: calc(100vh - 110rpx);
    }

    .order-list {
      padding-bottom: 110rpx;

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

    .puchase-footer {
      position: fixed;
      bottom: 0;
      width: 95%;
      padding: 0 2.5%;
      text-align: center;
      background-color: #ffffff;
      color: #b9b9b9;
      border-top: 1rpx solid #efefef;
      box-shadow: 0 4rpx 8rpx #e8e8e8;
      @include flex(space-between, center);

      .footer-item {
        padding: 28rpx 0;
        flex-basis: 50%;

        div {
          border-right: 1rpx solid #d4d4d4;
        }

        &:last-child div{
          border-right: 0;
        }
      }
    }
  }
</style>
