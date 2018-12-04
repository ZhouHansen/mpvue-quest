<template>
  <div class="order-container">
    <div class="payment-detail">
      <hoo-left-border-title :title="'购买内容'"></hoo-left-border-title>
      <div class="payment-detail-content" v-if="sectionData">
        <div class="activity-cover" :style="{background: 'url(' + sectionData.coverfile2 + ') no-repeat 50% 50%', backgroundSize: 'contain'}"></div>
        <div class="payment-inf">
          <div class="activity-title">{{sectionData.name}}</div>
          <div class="payment-price"><span>¥{{price}}</span> (单人)</div>
          <div class="payment-ctrl">
            <span class="ctrl-less" @click="chagePriceNumber('less')"></span>
            <span class="ctrl-number">{{priceNumber}}</span>
            <span class="ctrl-add" @click="chagePriceNumber('add')"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-detail">
      <hoo-left-border-title :title="'收货地址'"></hoo-left-border-title>
      <div class="user-content">
        <div class="address-section" v-if="address">
          <div class="address-inf">
            <div class="user-title">{{address.address}}</div>
            <span class="address-name">{{address.name}}</span>
            <span class="address-phone">{{address.phone}}</span>
          </div>
          <div class="address-edit" @click="editAddress()">
            <div class="address-ctrl"></div>
          </div>
        </div>
        <div class="address-add" v-if="!address" @click="editAddress()">
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
    <!-- <div class="activity-detail">
      <hoo-left-border-title :title="'商品详情'"></hoo-left-border-title>
      <div class="activity-inf">
        <div class="activity-item">
          <span class="activity-item-name">商品规格</span>
          <span class="activity-item-value">{{sectionData.specText}}</span>
        </div>
      </div>
    </div> -->
    <div class="payment-footer">
      <div class="total-money">
        <span class="total-money-title">总计金额</span>
        <span class="total-money-number">¥{{totalMoney}}</span>
      </div>
      <div class="submit-payment">
        <form @submit="submitPayment" report-submit='true' >
          <button form-type="submit" type="default" size="mini" class="payment-button">去支付</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import WxNetwork from '@/network/network.wx';
  import * as MutationType from '@/store/mutation.type';
  import hooLeftBorderTitle from '@/components/left.border.title';
  import Utils from '@/utils/index';

  export default {
    components: {
      hooLeftBorderTitle
    },
    mounted () {
      this.$wxUtils.setNavTitle('确认订单');
    },
    data () {
      return {
        price: 0,
        priceNumber: 1,
        sectionData: null,
        orderParams: null,
        address: null,
        orderId: '',
        payId: '',
        group: null
      };
    },
    computed: {
      totalMoney () {
        return this.price * this.priceNumber;
      },
      order () {
        return this.$store.state.discovery.order;
      }
    },
    onShow () {
      this.sectionData = this.$store.state.discovery.activity;
      this.orderParams = this.$store.state.discovery.order;
      this.address = this.orderParams ? this.orderParams.address : null;
      this.group = this.orderParams && this.orderParams.group ? this.orderParams.group : false;

      if (this.group) {
        this.sectionData.grouplist.forEach((item, index) => {
          if (item.id + '' === this.group) {
            this.price = parseInt(item.price / 100);
          }
        });
      } else {
        this.price = parseInt(this.sectionData.price / 100);
      }

      if (!this.address) {
        this.getAddress();
      }

      // let result = GetDataObjUseId(ProductSpecData, this.sectionData.spec);

      // if (result) {
      //   this.sectionData.specText = result.text;
      // }

      // console.log('discovery', this.$store.state.discovery);
      // console.log('设置的地址信息', this.address);
    },
    methods: {
      chagePriceNumber (e) {
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

      editSignature () {
        this.$router.push('/pages/home/custom.signature');
      },

      getAddress () {
        this.$network.account.getDefaultAddress().then(res => {
          // console.log(res);
          this.address = res.data;
          if (res.data) {
            this.$store.commit(MutationType.SET_ORDER_PARAMS, {address: this.address});
          }
        });
      },

      editAddress () {
        if (this.address) {
          this.$router.push({path: '/pages/account.packages/setting/setting.address.add', query: {id: this.address.id, type: 'order', obj: JSON.stringify(this.address)}});
        } else {
          this.$router.push('/pages/account.packages/setting/setting.address.add');
        }
      },

      submitPayment (e) {
        Utils.storageFormId(e.mp.detail.formId);
        if (this.group) {
          this.sendGroupOrder();
        } else {
          this.sendUnGroupOrder();
        }
        // this.$router.push('/pages/payment/payment.result');
      },

      sendUnGroupOrder () {
        let requestParams = {
          count: this.priceNumber
        };

        if (this.order.customSign && (this.order.customSign.text || this.order.customSign.name)) {
          let tag = {
            tag: this.order.customSign.text,
            to: this.order.customSign.name
          };
          requestParams['tag'] = tag;
        }

        if (this.address) {
          let address = {
            'address': this.address.address,
            'cell': this.address.cell,
            'cell2': this.address.cell2,
            'city': this.address.city,
            'district': this.address.district,
            'name': this.address.name,
            'prim': this.address.prim,
            'prov': this.address.prov
          };

          requestParams['address'] = address;
        } else {
          this.$router.push('/pages/account.packages/setting/setting.address.add');
          return;
        }

        this.$network.discovery.submitOrder(requestParams, null, 'weapp/order/place/product/' + this.sectionData.id).then(res => {
          // console.log(res);
          if (res.e === 0) {
            this.orderId = res.data.orderno;
            this.getPayParams();
          } else {
            this.$wxUtils.toast({title: res.msg});
          }
        });
      },

      sendGroupOrder () {
        let requestParams = {
          count: this.priceNumber
        };

        if (this.order.customSign && (this.order.customSign.text || this.order.customSign.name)) {
          let tag = {
            tag: this.order.customSign.text,
            to: this.order.customSign.name
          };
          requestParams['tag'] = tag;
        }

        if (this.address) {
          let address = {
            'address': this.address.address,
            'cell': this.address.cell,
            'cell2': this.address.cell2,
            'city': this.address.city,
            'district': this.address.district,
            'name': this.address.name,
            'prim': this.address.prim,
            'prov': this.address.prov
          };

          requestParams['address'] = address;
        } else {
          this.$wxUtils.toast({title: '请添加地址信息'});
          return;
        }

        this.$network.discovery.submitOrderGroup(requestParams, null, 'weapp/order/joingroup/' + this.group).then(res => {
          // console.log(res);
          if (res.e === 0) {
            this.orderId = res.data.orderno;
            this.$wxUtils.loading({title: '加载中...'});
            this.getPayParams();
          } else {
            this.$wxUtils.toast({title: res.msg});
          }
        });
      },

      getPayParams () {
        this.$network.account.getPaymentParams({}, null, 'weapp/order/pay/' + this.orderId).then(res => {
          this.$wxUtils.loading({show: false});
          this.payId = res.data.prepayid;
          this.$store.commit(MutationType.SET_ORDER_PARAMS, {group: false});
          if (res.data.prepayid) {
            this.$wxUtils.loading({title: '加载中...'});
            this.runWxPayment();
          } else {
            if (this.price === 0) {
              this.updateOrder({status: true});
              return;
            }
            this.$wxUtils.toast({title: '下单失败，未获取到微信支付订单号'});
          }
        });
      },

      runWxPayment () {
        let params = {
          sign: this.payId,
          cb: this.updateOrder
        };
        WxNetwork.wxPayment(params);
      },

      updateOrder (e) {
        let params = {
          type: '',
          text: '',
          order: {
            type: 'product',
            product: {
              name: this.sectionData.name,
              cover: this.sectionData.coverfile,
              id: this.sectionData.id
            },
            payId: this.payId,
            orderId: this.orderId
          }
        };

        if (this.group) {
          params.group = true;
          params.titleText = '拼团成功';
        }

        if (e.status) {
          this.$store.commit(MutationType.SET_ORDER_PARAMS, {customSign: null});

          this.$network.account.updateOrder({}, null, 'weapp/order/pay/' + this.orderId).then(res => {
            params.type = 'success';
            params.text = '等待商家确认发货';
            this.$router.replace({path: '/pages/payment/payment.result', query: {obj: JSON.stringify(params)}});
          });
        } else {
          params.type = 'wrong';
          params.text = '未成功支付';
          this.$router.replace({path: '/pages/payment/payment.result', query: {obj: JSON.stringify(params)}});
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';
  .order-container {
    min-height: 92vh;
    padding-bottom: 8vh;

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
        height: 100%;

        .payment-button {
          background-color: $topic-color;
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          width: 100%;
          height: 100%;
          border: 0;
          padding: 0;
          line-height: 8vh;
          border-radius: 0;
        }
      }
    }


  }
</style>
