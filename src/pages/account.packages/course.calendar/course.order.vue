<template>
  <div class="course-order-container" v-if="orderDetail">
    <div class="order-status" v-if="orderDetail.resultPayStatus.text">{{orderDetail.resultPayStatus.text}}</div>
    <div class="order-detail">
      <hoo-have-left-border-title :title="'订单信息'"></hoo-have-left-border-title>
      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="order-detail-item-label">单人票价</div>
          <div class="order-detail-item-text">{{orderDetail.price / 100}}/人</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">张数</div>
          <div class="order-detail-item-text">1张</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">总计</div>
          <div class="order-detail-item-text">{{orderDetail.price / 100}}元</div>
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
            <div class="content-cover" :style="{background: 'url(' + orderDetail.product.coverfile + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
          </div>
          <div class="order-detail-item-text">{{orderDetail.product.name}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">课程对象</div>
          <div class="order-detail-item-text">{{orderDetail.product.agesText}}</div>
        </div>
        <div class="order-detail-item" v-if="orderDetail.product.datefrom && orderDetail.product.datefrom[1] && orderDetail.product.dateto && orderDetail.product.dateto[1]">
          <div class="order-detail-item-label">开课时间</div>
          <div class="order-detail-item-text">{{orderDetail.product.datefrom[1]}} - {{orderDetail.product.dateto[1]}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">上课地点</div>
          <div class="order-detail-item-text">{{orderDetail.product.address}}</div>
        </div>
      </div>
    </div>

    <div class="user-detail" v-if="child">
      <hoo-have-left-border-title :title="'参加信息'"></hoo-have-left-border-title>
      <join-user-inf :type="'unedit'" :child="child"></join-user-inf>
    </div>

    <div class="organi-detail" v-if="orderDetail.product.instid">
      <hoo-have-left-border-title :title="'机构信息'"></hoo-have-left-border-title>
      <div class="organi-content">
        <organi-item :organiData="orderDetail.product"></organi-item>
      </div>
    </div>

    <div class="footer" v-if="orderDetail.resultPayStatus.id === 'waitPayment' || orderDetail.resultPayStatus.id === 'waitPayment' || orderDetail.resultPayStatus.id === 'waitAppraisal'">
      <div class="button-item" v-if="orderDetail.resultPayStatus.id === 'waitPayment'" >
        <hoo-button :text="'去付款'" :type="'topic'" @tapButton="runWxPayment"></hoo-button>
      </div>
      <div class="button-item" v-if="orderDetail.resultPayStatus.id === 'waitPayment'">
        <hoo-button :text="'取消订单'" :type="'normal'" @tapButton="cancelOrder"></hoo-button>
      </div>
      <div class="button-item" v-if="orderDetail.resultPayStatus.id === 'waitAppraisal'">
        <hoo-button :text="'去评价'" :type="'topic'" @tapButton="visitAppraisal"></hoo-button>
      </div>
      <!-- <div class="button-item">
        <hoo-button :text="'联系客服'" v-if="orderDetail.resultPayStatus.id === 'end'" :type="'normal'"></hoo-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import WxNetwork from '@/network/network.wx';
import {AgeFilterData, CourseStatus, GetDataObjUseId} from '@/utils/default.data';
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooButton from '@/components/button';
import joinUserInf from '@/module/base/join.user.inf';
import organiItem from '@/components/organization';

export default {
  components: {
    hooHaveLeftBorderTitle,
    hooButton,
    joinUserInf,
    organiItem
  },
  props: [''],
  data () {
    return {
      orderDetail: null,
      child: null
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('课程订单详情');
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
        this.orderDetail = res.data;

        // console.log('订单信息', this.orderDetail);
        if (this.orderDetail.cid) {
          this.getChildDetail(this.orderDetail.cid);
        }

        let result = GetDataObjUseId(AgeFilterData, this.orderDetail.product.ages);

        if (result) {
          this.orderDetail.product.agesText = result.text;
        }

        this.setPayStatus();
      });
    },

    setPayStatus () {
      let payResult = null;
      if (this.orderDetail.paystate === 0 && this.orderDetail.status === 0) {
        payResult = GetDataObjUseId(CourseStatus, 'waitPayment');
      } else
      if (this.orderDetail.paystate === 0 && this.orderDetail.status === 1) {
        payResult = GetDataObjUseId(CourseStatus, 'timeEnd');
      } else
      if (this.orderDetail.paystate === 1 && this.orderDetail.status === 0 && this.orderDetail.commented === 0) {
        payResult = GetDataObjUseId(CourseStatus, 'alreadyConfirm');
      } else
      if (this.orderDetail.paystate === 1 && this.orderDetail.status === 1 && this.orderDetail.commented === 0) {
        payResult = GetDataObjUseId(CourseStatus, 'waitAppraisal');
      } else
      if (this.orderDetail.commented === 1) {
        payResult = GetDataObjUseId(CourseStatus, 'end');
      } else
      if (this.orderDetail.paystate === 3) {
        payResult = GetDataObjUseId(CourseStatus, 'timeEnd');
      } else {
        payResult = GetDataObjUseId(CourseStatus, 'end');
      }

      this.orderDetail.resultPayStatus = payResult;
    },

    getChildDetail (id) {
      this.$network.account.getChildrenInf({}, null, 'weapp/child/' + id).then(res => {
        this.child = res.data;
      });
    },

    cancelOrder () {
      this.$wxUtils.showModal({title: '确定取消订单？'}).then(res => {
        if (res) {
          this.$network.account.cancelOrder({}, null, 'weapp/order/cancel/' + this.orderDetail.orderno).then(res => {
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
        lessonId: this.orderDetail.product.id,
        instId: this.orderDetail.product.instid,
        orderno: this.orderDetail.orderno,
        teachers: this.orderDetail.product.teachers
      };

      this.$router.push({path: '/pages/account.packages/course.calendar/course.appraisal', query: {obj: JSON.stringify(params)}});
    },

    runWxPayment () {
      let params = {
        sign: this.orderDetail.wxtradeno,
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
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .course-order-container {
    min-height: 100vh;
    background-color: #f9f9f9;

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
            word-break:break-all;
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
      margin-top: 20rpx;
      background-color: #ffffff;
      padding: 40rpx;
    }

    .organi-detail {
      margin-top: 20rpx;
      background-color: #ffffff;
      padding: 40rpx;

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
