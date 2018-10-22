<template>
  <div class="order-container">
    <div class="group-tips" v-if="group && showGroupTips">
      <span>拼团在24小时内无法成团将自动退款！</span>
      <span class="group-tips-icon" @click="hideGroupTips"></span>
    </div>
    <div class="payment-detail">
      <hoo-left-border-title :title="'购买内容'"></hoo-left-border-title>
      <div class="payment-detail-content">
        <div class="activity-cover" :style="{background: 'url(' + sectionData.coverfile + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
        <div class="payment-inf">
          <div class="activity-title">{{sectionData.name}}</div>
          <div class="payment-price"><span>¥{{price}}</span> (单人)</div>
        </div>
      </div>
    </div>
    <div class="user-detail">
      <hoo-left-border-title :title="'参加信息'"></hoo-left-border-title>
      <div class="user-content">
        <div class="parent">
          <div class="user-title">家长信息</div>
          <div class="parent-inf">
            <span class="parent-name">孙俪</span>
            <span class="parent-phone">13304482010</span>
          </div>
        </div>
        <div class="child">
          <div class="user-title">孩子信息</div>
          <div class="child-section" @click="editChildren" v-if="children">
            <div class="child-inf">
              <span class="child-name">{{children.name}}</span>
              <span class="child-icon man" :class="children.gender === 'F'? 'man' : 'woman'"></span>
            </div>
            <div class="child-ctrl"></div>
          </div>
          <div class="child-add" @click="editChildren" v-if="!children">
            <span>添加</span>
            <span class="child-add-icon"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-detail">
      <hoo-left-border-title :title="'活动详情'"></hoo-left-border-title>
      <div class="activity-inf">
        <div class="activity-item">
          <span class="activity-item-name">活动时间</span>
          <span class="activity-item-value">9月11日-9月20日</span>
        </div>
        <div class="activity-item">
          <span class="activity-item-name">活动对象</span>
          <span class="activity-item-value">9月11日-9月20日</span>
        </div>
        <div class="activity-item">
          <span class="activity-item-name">活动地点</span>
          <span class="activity-item-value">{{sectionData.address}}</span>
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
  import * as MutationType from '@/store/mutation.type';
  import hooLeftBorderTitle from '@/components/left.border.title';

  export default {
    components: {
      hooLeftBorderTitle
    },
    mounted () {
      this.$wxUtils.setNavTitle('确认订单');
      // console.log(this.$store.state.discovery.order);
      // console.log(this.$store.state.discovery.activity);

      this.getChildren();
    },
    data () {
      return {
        sectionData: null,
        price: 0,
        priceNumber: 1,
        group: false,
        showGroupTips: true,
        setApp: {},
        children: null,
        orderParams: null,
        pathObj: this.$wxUtils.getPagesLength()
      };
    },
    computed: {
      totalMoney () {
        return this.price * this.priceNumber;
      }
    },
    onShow () {
      this.setApp = this.$storage.get(this.$storageTypeName.setApp);
      if (this.setApp && this.setApp.unShowOrderTips) {
        this.showGroupTips = false;
      }

      // let discovery = this.$store.state.discovery;
      // this.sectionData = discovery.activity;
      // this.price = parseInt(this.sectionData.price / 100);

      // this.orderParams = discovery.order;
      // this.group = this.orderParams.group ? this.orderParams.group : false;
      // this.children = this.orderParams.children ? this.orderParams.children : null;

      // console.log('discovery', this.$store.state.discovery);
      // console.log('设置的孩子信息', this.children);
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

      hideGroupTips () {
        let setApp = {
          unShowOrderTips: true
        };
        this.$storage.set(this.$storageTypeName.setApp, setApp);
        this.showGroupTips = false;
      },

      // getChildren () {
      //   this.$network.account.getChildrensList({limit: 1, offset: 0}).then(res => {
      //     console.log(res);
      //     if (res.data.length > 0) {
      //       this.children = res.data[0];
      //       this.$store.commit(MutationType.SET_ORDER_PARAMS, {children: this.children});
      //     }
      //   });
      // },

      editChildren () {
        if (this.children) {
          this.$router.push({path: '/pages/account.packages/childrens.add', query: {id: this.children.id, type: 'order', obj: JSON.stringify(this.children)}});
        } else {
          this.$router.push({path: '/pages/account.packages/childrens.add', query: {type: 'order'}});
        }
      },

      submitPayment () {
        if (this.group) {
          this.sendGroupOrder();
        } else {
          this.sendUnGroupOrder();
        }
        // this.$router.push('/pages/payment/payment.result');
      },

      sendUnGroupOrder () {
        this.$network.discovery.submitOrder({cid: this.children.id}, null, 'weapp/order/place/lesson/' + this.sectionData.id).then(res => {
          console.log(res);
          if (res.e === 0) {
            this.$wxUtils.toast({title: '发送成功，现在是测试'});
            setTimeout(() => {
              this.$router.go(this.pathObj.length - 1);
            }, 3000);
          };
        });
      },

      sendGroupOrder () {
        this.$network.discovery.submitOrderGroup({cid: this.children.id}, null, 'weapp/order/joingroup/' + this.group).then(res => {
          console.log(res);
          if (res.e === 0) {
            this.$wxUtils.toast({title: '发送成功，现在是测试'});
            this.$store.commit(MutationType.SET_ORDER_PARAMS, {group: false});

            setTimeout(() => {
              this.$router.go(this.pathObj.length - 1);
            }, 3000);
          }
        });
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

    .group-tips {
      @include flex();
      background-color: $orange-color;
      color: #ffffff;
      padding: 20rpx 40rpx;

      .group-tips-icon {
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        @include backgroundImg('../../assets/images/ic_close.png');
      }
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

        .user-title {
          font-size: 18px;
          color: #000000;
          font-weight: bold;
        }
        .parent {
          margin-top: 30rpx;
          padding-bottom: 30rpx;

          .parent-inf {
            margin-top: 12rpx;

            .parent-name {
              margin-right: 30rpx;
            }
          }
        }
        .child {
          padding-top: 30rpx;
          border-top: 1rpx solid #efefef;

          .child-section {
            margin-top: 12rpx;
            @include flex();

            .child-name {
              margin-right: 10rpx;
            }

            .child-icon {
              width: 22rpx;
              height: 22rpx;
              display:inline-block;
            }

            .man {
              @include backgroundImg('../../assets/images/man.png');
            }

            .woman {
              @include backgroundImg('../../assets/images/woman.png');
            }

            .child-ctrl {
              @include backgroundImg('../../assets/images/write.png');
              width: 32rpx;
              height: 32rpx;
            }
          }

          .child-add {
            margin-top: 30rpx;
            color: $orange-color;
            @include flex();

            .child-add-icon {
              @include backgroundImg('../../assets/images/icon_add_child.png');
              width: 32rpx;
              height: 32rpx;
            }
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
          }
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
