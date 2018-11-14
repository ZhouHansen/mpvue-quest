<template>
  <div class="bindphone-container" v-if="showDialogStatus.bindPhone">
    <div class="bindphone-content">
      <div class="title">绑定手机号</div>
      <!-- <div class="desc">绑定手机号，奖励5元奖学金！</div> -->
      <div class="phone">
        <input type="number" placeholder="请输入手机号" :value="phone" id="phone" @input="setInputValue">
      </div>
      <div class="verify-code">
        <input type="number" placeholder="请输入验证码" :value="code" id="code" @input="setInputValue">
        <span class="topic" v-if="!interval" @click="getCode">获取验证码</span>
        <span v-if="interval">{{time}}s</span>
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
import * as MutationType from '@/store/mutation.type';
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
      phone: '',
      code: '',
      time: 60,
      interval: null
    };
  },
  methods: {
    setInputValue (e) {
      let id = e.currentTarget.id;
      let value = e.mp.detail.value;

      if (id === 'phone') {
        this.phone = value;
      } else
      if (id === 'code') {
        this.code = value;
      }
    },

    getCode () {
      if ((this.phone + '').length === 11) {
        this.$network.account.sendVerifyMessage({}, null, 'weapp/verifycode/' + this.phone).then(res => {
          console.log(res);
          if (res.e === 0) {
            this.$wxUtils.toast({title: '发送成功'});
            this.interval = setInterval(() => {
              this.time = this.time - 1;
              if (this.time === 0) {
                clearInterval(this.interval);
                this.interval = null;
                this.time = 60;
              }
            }, 1000);
          }
        });
      } else {
        this.$wxUtils.toast({title: '请输入正确的电话号码'});
      }
    },

    submitBindPhone () {
      console.log(this.phone);
      console.log(this.code);

      if ((this.phone + '').length !== 11 || !this.code) {
        this.$wxUtils.toast({title: '请输入正确的电话号和验证码'});
        return;
      }

      this.$network.account.bindPhoneToOpenid({}, null, 'weapp/bindingcell/' + this.phone + '/' + this.code).then(res => {
        console.log(res);
        if (res.e === 0) {
          this.$wxUtils.toast({title: '提交成功'});
          this.getUserInf();
          this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: false, bindPhone: false});
        }
      });
    },

    getUserInf () {
      this.$network.account.getUserInf().then(res => {
        this.$storage.set(this.$storageTypeName.userInf, res.data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .bindphone-container {
    animation: fadeIn 0.1s;
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
          text-align: center;
          vertical-align: center;
        }

        .topic {
          color: $topic-color;
        }
      }

      .submit-button {
        margin-top: 30rpx;
      }
    }
  }
</style>
