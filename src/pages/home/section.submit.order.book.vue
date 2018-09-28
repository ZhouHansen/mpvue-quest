<template>
  <div class="order-container">
    <div class="payment-detail">
      <hoo-left-border-title :title="'购买内容'"></hoo-left-border-title>
      <div class="payment-detail-content">
        <div class="activity-cover" :style="{background: 'url(' + cover + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
        <div class="payment-inf">
          <div class="activity-title">2018招牌通识营-在创造中原力觉醒</div>
          <div class="payment-price"><span>¥{{price}}</span> (单人)</div>
          <div class="payment-ctrl">
            <span class="ctrl-less" @click="chagePriceNUmber('less')"></span>
            <span class="ctrl-number">{{priceNumber}}</span>
            <span class="ctrl-add" @click="chagePriceNUmber('add')"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-detail">
      <hoo-left-border-title :title="'收货地址'"></hoo-left-border-title>
      <div class="user-content">
        <div class="address-section">
          <div class="address-inf">
            <div class="user-title">北京朝阳区蓝河大厦23号</div>
            <span class="address-name">张爱玲</span>
            <span class="address-phone">12341325534</span>
          </div>
          <div class="address-edit" @click="editAddress(2)">
            <div class="address-ctrl"></div>
          </div>
        </div>
        <div class="address-add" @click="editAddress('add')">
          <span>添加收货地址</span>
          <span class="address-add-icon"></span>
        </div>
      </div>
    </div>

     <div class="custom-detail">
      <hoo-left-border-title :title="'定制签名'"></hoo-left-border-title>
      <div v-show="order.customSign">
        <div class="custom-inf">
          <div class="custom-list">
            <div class="custom-item">
              <span class="custom-item-name">留言内容</span>
              <span class="custom-item-value">{{order.customSign?order.customSign.text:''}}</span>
            </div>
            <div class="custom-item">
              <span class="custom-item-name">给予</span>
              <span class="custom-item-value">{{order.customSign?order.customSign.name:''}}</span>
            </div>
          </div>
          <div class="custom-edit" @click="editSignature">
            <div class="custom-ctrl"></div>
          </div>
        </div>
      </div>
      <div v-show="!order.customSign">
        <div class="custom-add" @click="editSignature">
          <span>添加定制签名</span>
          <span class="custom-add-icon"></span>
        </div>
      </div>
    </div>
    <div class="activity-detail">
      <hoo-left-border-title :title="'活动详情'"></hoo-left-border-title>
      <div class="activity-inf">
        <div class="activity-item" @click="editSignature">
          <span class="activity-item-name">活动时间</span>
          <span class="activity-item-value">9月11日-9月20日</span>
        </div>
        <div class="activity-item">
          <span class="activity-item-name">活动时间</span>
          <span class="activity-item-value">9月11日-9月20日</span>
        </div>
        <div class="activity-item">
          <span class="activity-item-name">活动时间</span>
          <span class="activity-item-value">9月11日-9月20日</span>
        </div>
      </div>
    </div>
    <div class="payment-footer">
      <div class="total-money">
        <span class="total-money-title">总计金额</span>
        <span class="total-money-number">¥{{totalMoney}}</span>
      </div>
      <div class="submit-payment" @click="submitPayment">去支付</div>
    </div>
  </div>
</template>
<script>
  import hooLeftBorderTitle from '@/components/left.border.title';

  export default {
    // props: ['type'],
    components: {
      hooLeftBorderTitle
    },
    mounted () {
      this.$wxUtils.setNavTitle('确认订单');

      // console.log(this.$store.state.discovery.order.customSign);
      // console.log(this.$store.state.discovery.activity);
    },
    data () {
      return {
        cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_170849.403868.png',
        price: 128,
        priceNumber: 1,
        type: 'group',
        showGroupTips: true
      };
    },
    computed: {
      totalMoney () {
        return this.price * this.priceNumber;
      },
      order () {
        return this.$store.state.discovery.order;
      },
      section () {
        return this.$store.state.discovery.activity;
      }
    },
    methods: {
      chagePriceNUmber (e) {
        if (e === 'less') {
          if (this.priceNumber > 1) {
            this.priceNumber = this.priceNumber - 1;
          }
        } else {
          if (this.priceNumber < 99) {
            this.priceNumber = this.priceNumber + 1;
          }
        }
      },

      submitPayment () {
        this.$router.push('/pages/payment/payment.result');
      },

      hideGroupTips () {
        this.showGroupTips = false;
      },

      editSignature () {
        this.$router.push('/pages/home/custom.signature');
      },

      editAddress (e) {
        if (e !== 'add') {
          this.$router.push({path: '/pages/account.packages/setting/setting.address.add', query: {id: '123'}});
        } else {
          this.$router.push('/pages/account.packages/setting/setting.address.add');
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';
  .order-container {
    min-height: 100vh;

    @mixin sectionStyle () {
      border-top: 20rpx solid #f9f9f9;
      padding: 40rpx;
      background-color: #ffffff;
    }

    .payment-detail {
      @include sectionStyle();

      .payment-detail-content {
        margin-top: 30rpx;
        @include flex(flex-start);

        .activity-cover {
          width: 30vw;
          height: 30vw;
          margin-right: 40rpx;
          border-radius: 16rpx;
          flex-shrink: 0;
        }

        .payment-inf {
          .activity-title {
            font-size: 18px;
            font-weight: bold;
          }

          .payment-price {
            color: $topic-color;
            font-weight: bold;

            span {
              font-size: 22px;
            }
          }

          .payment-ctrl {
            @include flex(flex-start);

            .ctrl-less {
              @include backgroundImg('../../assets/images/ic_less.png');
              width: 40rpx;
              height: 40rpx;
            }

            .ctrl-number {
              background-color: #f4f4f4;
              padding: 0 20rpx;
              color: #000000;
              font-size: 15px;
              border-radius: 20rpx;
              margin: 0 12rpx;
            }

            .ctrl-add {
              @include backgroundImg('../../assets/images/ic_add_more.png');
              width: 40rpx;
              height: 40rpx;
            }
          }
        }
      }
    }

    .user-detail {
      @include sectionStyle();

      .user-content {
        padding-left: 26rpx;
        padding-top: 30rpx;

        .user-title {
          font-size: 18px;
          color: #000000;
          font-weight: bold;
        }

        .address-section {
          margin-top: 12rpx;
          @include flex();

          .address-name {
            margin-right: 10rpx;
          }

          .address-edit {
            flex-shrink: 0;
            padding: 30rpx 0 30rpx 40rpx;
            border-left: 1rpx solid #ececec;

            .address-ctrl {
              @include backgroundImg('../../assets/images/write.png');
              width: 32rpx;
              height: 32rpx;
            }
          }
        }


        .address-add {
          margin-top: 30rpx;
          color: $orange-color;
          @include flex();

          .address-add-icon {
            @include backgroundImg('../../assets/images/icon_add_child.png');
            width: 32rpx;
            height: 32rpx;
          }
        }
      }
    }

    .activity-detail {
      @include sectionStyle();
      margin-bottom: 8vh;
      border-bottom: 20rpx solid #f9f9f9;
      .activity-inf {
        margin-top: 30rpx;
        padding-left: 16rpx;

        .activity-item {
          @include flex(flex-start, flex-start);
          margin-top: 26rpx;

          &:first-child {
            margin-top: 0;
          }

          .activity-item-name {
            color: #9F9F9F;
            margin-right: 40rpx;
            flex-basis: 20%;
            flex-shrink: 0;
          }
        }
      }
    }

    .custom-detail {
      @include sectionStyle();

      .custom-inf {
        margin-top: 30rpx;
        padding-left: 16rpx;
        @include flex();

        .custom-list {
          flex-basis: 100%;
        }

        .custom-item {
          @include flex(flex-start, flex-start);
          margin-top: 26rpx;

          &:first-child {
            margin-top: 0;
          }

          .custom-item-name {
            color: #9F9F9F;
            margin-right: 40rpx;
            flex-basis: 25%;
            flex-shrink: 0;
          }
        }

        .custom-edit {
          padding: 30rpx 0 30rpx 40rpx;
          border-left: 1rpx solid #ececec;
          flex-shrink: 0;

          .custom-ctrl {
            @include backgroundImg('../../assets/images/write.png');
            width: 32rpx;
            height: 32rpx;
          }
        }
      }

      .custom-add {
          margin-top: 30rpx;
          padding-left: 16rpx;
          color: $orange-color;
          @include flex();

          .custom-add-icon {
            @include backgroundImg('../../assets/images/icon_add_child.png');
            width: 32rpx;
            height: 32rpx;
          }
        }
    }

    .payment-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 8vh;
      line-height: 8vh;
      background-color: #ffffff;
      z-index: 9;
      border-top: 1rpx solid #f9f9f9;
      @include flex();

      .total-money {
        flex-basis: 70%;
        text-align: center;

        .total-money-title {
          color: #000000;
          margin-right: 20rpx;
        }

        .total-money-number {
          font-size: 22px;
          font-weight: bold;
          color: $topic-color;
        }
      }

      .submit-payment {
        flex-basis: 30%;
        background-color: $topic-color;
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
        height: 100%;
        text-align: center;
      }
    }


  }
</style>
