<template>
  <div class="course-order-container">
    <div class="order-status">待付款</div>
    <div class="order-detail">
      <hoo-have-left-border-title :title="'订单信息'"></hoo-have-left-border-title>
      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="order-detail-item-label">单人票价</div>
          <div class="order-detail-item-text">198/人</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">张数</div>
          <div class="order-detail-item-text">2张</div>
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
          <div class="order-detail-item-label">课程对象</div>
          <div class="order-detail-item-text">儿童班</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">开课时间</div>
          <div class="order-detail-item-text">2018年7月2日-9月2日</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-item-label">上课地点</div>
          <div class="order-detail-item-text">蘑菇街</div>
        </div>
      </div>
    </div>

    <div class="user-detail">
      <hoo-have-left-border-title :title="'参加信息'"></hoo-have-left-border-title>
      <join-user-inf :type="'unedit'"></join-user-inf>
    </div>

    <div class="organi-detail">
      <hoo-have-left-border-title :title="'机构信息'"></hoo-have-left-border-title>
      <div class="organi-content">
        <organi-item></organi-item>
      </div>
    </div>

    <div class="footer">
      <!-- <hoo-button :text="'取消订单'" :type="'normal'"></hoo-button> -->
      <hoo-button :text="'去评价'" :type="'topic'" @tapButton="visitAppraisal"></hoo-button>
      <!-- <hoo-button :text="'联系客服'" :type="'normal'"></hoo-button> -->
    </div>
  </div>
</template>
<script>
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
      cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png',
      footerText: '取消订单',
      footerType: 'normal'
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('课程订单详情');
  },
  methods: {
    visitAppraisal () {
      console.log('去评价');
      this.$router.push('/pages/account.packages/course.calendar/course.appraisal');
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
    }
  }
</style>
