<template>
  <div class="purchase-container">
    <div class="order-list" v-if="goods">
      <div class="order-item" v-for="item in goods" :key="item.id">
        <div class="order-item-body">
          <div class="order-id">
            <hoo-have-left-border-title :title="'下单时间：' + item.issueat"></hoo-have-left-border-title>
          </div>
          <div class="order-item-status" v-if="resultPayStatus">{{resultPayStatus.text}}</div>
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
    <hoo-empty v-if="!goods || goods.length === 0" :type="'normal'" :text="'没有待评价列表～'"></hoo-empty>
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
      goods: null,
      resultPayStatus: null
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('商品购买');
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
        offset: this.offset
      };
      this.$wxUtils.loading({title: '加载中...'});
      this.resultPayStatus = GetDataObjUseId(PurchaseStatus, 'waitAppraisal');
      this.$network.account.getCourseListWaitAppr(params, null, 'weapp/uncommentedorders/product').then(res => {
        // console.log(res);
        if (!this.goods) {
          this.goods = [];
        }

        this.$wxUtils.loading({show: false});
        this.total = res.total;
        this.goods = this.goods.concat(res.data);
      });
    },

    cancelOrder (e) {
      this.$wxUtils.showModal({title: '确定取消订单？'}).then(res => {
        if (res) {
          this.$network.account.cancelOrder({}, null, 'weapp/order/cancel/' + e).then(res => {
            if (res.e === 0) {
              this.$wxUtils.toast({title: '取消成功'});
              this.refreshParams();
              this.getGoods();
            } else {
              this.$wxUtils.toast({title: res.msg});
            }
          });
        }
      });
    },

    visitOrderDetail (e) {
      this.$router.push({path: '/pages/account.packages/purchase.goods/purchase.detail', query: {id: e}});
    }
  },
  onReachBottom () {
    if (this.total > this.offset + this.limit) {
      this.offset = this.offset + this.limit;
      this.getGoods();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

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
