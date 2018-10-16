<template>
  <div class="address-add-container">
    <div class="child-add-content">
      <div class="item">
        <div class="item-label">省市区</div>
        <div class="picker-contain">
          <picker @change="bindAreaChange" :value="areaValue"  :mode="'region'">
            <div class="item-input" >
              <span v-if="areaValue.length > 0">{{areaValue[0]}}{{areaValue[1]}}{{areaValue[2]}}</span>
              <span v-if="areaValue.length === 0">请选择</span>
              <span class="item-arrow-icon"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="item">
        <div class="item-label">详细地址</div>
        <div class="item-input">
          <input type="text" placeholder="输入详细地址" id="address" :value="address" @change="inputVal">
        </div>
      </div>
       <div class="item">
        <div class="item-label">姓名</div>
        <div class="item-input">
          <input type="text" placeholder="输入姓名" id="name" :value="name" @change="inputVal">
        </div>
      </div>
      <div class="item">
        <div class="item-label">联系方式</div>
        <div class="item-input">
          <input type="text" id="telephone" placeholder="输入联系方式" :value="telephone" @change="inputVal">
        </div>
      </div>
      <div class="item">
        <div class="item-label">设置</div>
        <div class="item-input set-address" @click="tapSetDefaultAddress">
          <div class="item-input-icon" :class="defaultAddressStatus?'checked':'default'"></div>
          <div class="item-input-value">默认为收货地址</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
  </div>
</template>
<script>
import * as MutationType from '@/store/mutation.type';
import hooButton from '@/components/button';

export default {
  components: {
    hooButton
  },
  data () {
    return {
      id: null,
      telephone: null,
      areaValue: [],
      name: null,
      address: null,

      defaultAddressStatus: false
    };
  },
  mounted () {
    if (this.$route.query.id) {
      this.$wxUtils.setNavTitle('编辑地址');
      this.id = this.$route.query.id;
    } else {
      this.$wxUtils.setNavTitle('添加地址');
      this.id = 0;
    }

    this.getAddressDetail();
  },
  methods: {
    inputVal (e) {
      this[e.mp.target.id] = e.mp.detail.value;
    },

    getAddressDetail () {
      let result = JSON.parse(this.$route.query.obj);
      this.telephone = result.cell;
      this.areaValue = [result.prov, result.city, result.district];
      this.name = result.name;
      this.address = result.address;
      this.defaultAddressStatus = result.prim;
    },

    bindAreaChange (e) {
      console.log(e);
      this.areaValue = e.mp.detail.value;
    },

    tapSetDefaultAddress () {
      this.defaultAddressStatus = !this.defaultAddressStatus;
    },

    submit () {
      let requestParams = {
        'address': this.address,
        'cell': this.telephone,
        'city': this.areaValue[1],
        'district': this.areaValue[2],
        'prov': this.areaValue[0],
        'id': this.id,
        'name': this.name,
        'prim': this.defaultAddressStatus ? 1 : 0
      };

      console.log(requestParams);

      for (let i in requestParams) {
        if (!requestParams[i] && i !== 'id' && i !== 'prim') {
          this.$wxUtils.toast({title: '请将信息填写完整'});
          return;
        }
      }

      this.$network.account.postAddressInf(requestParams).then(res => {
        if (res.e === 0) {
          this.$wxUtils.toast({title: '提交成功'});

          if (this.$route.query.type === 'order') {
            this.$store.commit(MutationType.SET_ORDER_PARAMS, {address: requestParams});
          }
          setTimeout(() => {
            this.$router.back();
          }, 2000);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .address-add-container {
     min-height: 100vh;
    background-color: #f9f9f9;

    .child-add-content {
      background-color: #ffffff;
      padding: 80rpx 80rpx 40rpx 80rpx;

      .item {
        border-bottom: 1rpx solid #eaeaea;
        padding: 29rpx 5rpx 29rpx 0;
        @include flex();

        .item-label {
          font-size: 16px;
          flex-basis: 35%;
          flex-shrink: 0;
        }

        .picker-contain {
          width: 100%;
        }

        .item-input {
          font-size: 16px;
          color: #000000;
          width: 100%;
          @include flex();

          .item-arrow-icon {
            width: 24rpx;
            height: 24rpx;
            display: inline-block;
            margin-right: 16rpx;
            flex-shrink: 0;
            @include backgroundImg('../../../assets/images/arrows_search.png');
          }
        }

        .set-address {
          font-size: 16px;
          color: #000000;
          width: 100%;
          @include flex(flex-start);

          .item-input-icon {
            display: inline-block;
            margin-right: 20rpx;
            border-radius: 4rpx;
          }

          .default {
            width: 29rpx;
            height: 29rpx;
            border: 1rpx solid #d0d0d0;
          }

          .checked {
            width: 32rpx;
            height: 32rpx;
            @include backgroundImg('../../../assets/images/checked_ic.png');
          }
        }
      }
    }

    .footer {
      width: calc(100vw - 80rpx);
      position: fixed;
      bottom: 40rpx;
      left: 40rpx;
    }
  }
</style>
