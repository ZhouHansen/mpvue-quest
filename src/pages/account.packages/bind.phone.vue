<template>
  <div class="bind-phone-container">
    <div class="phone-section">
      <input type="number" :value="phone" placeholder="请输入手机号" id="phone"  @input="inputVal">
    </div>
    <div class="code-section" :class="{'topic-border':interval}">
      <input type="text" :value="code" placeholder="请输入验证码" id="code" @input="inputVal">
      <span class="get-code topic-color" @click="getCode" v-if="!interval">获取验证码</span>
      <span class="get-code left-topic-border"  v-if="interval">再次发送{{time}}s</span>
    </div>
    <div class="footer">
      <hoo-button :text="'提交'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
  </div>
</template>
<script>
import hooButton from '@/components/button';

export default {
  components: {
    hooButton
  },
  props: [],
  data () {
    return {
      phone: null,
      code: null,
      time: 60,
      interval: null
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('绑定手机号');
  },
  methods: {
    inputVal (e) {
      this[e.mp.target.id] = e.mp.detail.value;
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

    submit () {
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
  @import '../../assets/style/variables.scss';

  .bind-phone-container {
    padding: 80rpx;
    min-height: calc(100vh - 160rpx);

    .topic-border {
      border: 1rpx solid $topic-color !important;
    }

    .phone-section, .code-section {
      border: 1rpx solid #eeeeee;
      border-radius: 50rpx;

      input {
        padding: 24rpx 40rpx;
      }
    }

    .code-section {
      margin-top: 30rpx;
      @include flex();

      .get-code {
        display: inline-block;
        height: 100%;
        flex-basis: 30%;
        flex-shrink: 0;
        text-align: center;
        border-left: 1rpx solid #eeeeee;
        padding: 24rpx 30rpx;
      }

      .topic-color {
        border-left: 1rpx solid #eeeeee;
        color: $topic-color;
      }

      .left-topic-border {
        color: #9f9f9f;
        border-left: 1rpx solid $topic-color;
      }
    }

    .footer {
      margin-top: 30rpx;
      width: 100%;
    }
  }
</style>
