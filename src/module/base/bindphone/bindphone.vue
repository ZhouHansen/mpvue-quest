<template>
  <div class="bindphone-container" v-if="showDialogStatus.bindPhone">
    <div class="bindphone-content">
      <div class="title">绑定手机号</div>
      <div class="desc">绑定手机号，奖励5元奖学金！</div>
      <div class="phone">
        <input type="number" placeholder="请输入手机号" :value="bindPhone" id="phone" @input="setInputValue">
      </div>
      <div class="verify-code">
        <input type="number" placeholder="请输入验证码" :value="bindCode" id="code" @input="setInputValue">
        <span>获取验证码</span>
      </div>
      <div class="submit-button">
        <hoo-button :type="'topic'" :text="'提交'" @tapButton="submitBindPhone"></hoo-button>
      </div>
    </div>
    <hoo-dialog-bg></hoo-dialog-bg>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import hooDialogBg from '@/components/dialog.bg';
import hooButton from '@/components/button';

export default {
  computed: mapState([
    // 映射 this.showDialogStatus 为 store.state.showDialogStatus
    'showDialogStatus'
  ]),
  components: {
    hooDialogBg,
    hooButton
  },
  data () {
    return {
      bindPhone: '',
      bindCode: ''
    };
  },
  methods: {
    setInputValue (e) {
      let id = e.currentTarget.id;
      let value = e.mp.detail.value;

      if (id === 'phone') {
        this.bindPhone = value;
      } else
      if (id === 'code') {
        this.bindCode = value;
      }
    },

    submitBindPhone () {
      console.log(this.bindPhone);
      console.log('提交绑定手机号');
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .bindphone-container {
    .bindphone-content {
      position: fixed;
      width: calc(90vw - 80rpx);
      left: 5vw;
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 40rpx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 999;

      .title {
        font-size: 16px;
        color: #000000;
        text-align: center;
      }

      .desc {
        margin-top:20rpx;
        text-align: center;
      }

      .phone {
        margin-top: 30rpx;
        border-radius: 50rpx;
        border: 1rpx solid #dcdcdc;
        overflow: hidden;

        input {
          padding: 24rpx 40rpx;
        }
      }

      .verify-code {
        margin-top: 30rpx;
        border-radius: 50rpx;
        border: 1rpx solid #dcdcdc;
        overflow: hidden;
        @include flex(space-between);
        input {
          padding: 24rpx 40rpx;
          flex-basis: 63%;
          border-right: 1rpx solid #dcdccd;
        }

        span {
          display: inline-block;
          width: 36%;
          color: $topic-color;
          text-align: center;
          vertical-align: center;
        }
      }

      .submit-button {
        margin-top: 30rpx;
      }
    }
  }
</style>
