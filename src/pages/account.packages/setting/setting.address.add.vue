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
          <input type="text" placeholder="输入详细地址" id="address" :value="address">
        </div>
      </div>
       <div class="item">
        <div class="item-label">姓名</div>
        <div class="item-input">
          <input type="text" placeholder="输入姓名" id="name" :value="name">
        </div>
      </div>
      <div class="item">
        <div class="item-label">联系方式</div>
        <div class="item-input">
          <input type="text" id="telephone" placeholder="输入联系方式" :value="telephone">
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
import hooButton from '@/components/button';

export default {
  components: {
    hooButton
  },
  data () {
    return {
      id: null,
      telephone: null,
      areaValue: ['辽宁省', '大连市', '高新园区'],
      name: null,
      address: null,

      defaultAddressStatus: false
    };
  },
  mounted () {
    this.id = this.$route.query.id;
    console.log(this.id);
    if (this.id) {
      this.$wxUtils.setNavTitle('编辑地址');
    } else {
      this.$wxUtils.setNavTitle('添加地址');
    }
  },
  methods: {
    bindAreaChange (e) {
      console.log(e);
      this.areaValue = e.mp.detail.value;
    },

    tapSetDefaultAddress () {
      this.defaultAddressStatus = !this.defaultAddressStatus;
    },

    submit () {

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
          flex-basis: 40%;
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
