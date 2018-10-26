<template>
  <div class="feedback-container">
    <textarea :value="descVal" @change="inputDesc" class="desc textarea" :placeholder-style="'color: #bfbfbf;opacity: 0.4;'" :placeholder="'请填写您的问题或反馈'"></textarea>
    <input :value="emailVal" @change="inputEmail" class="email textarea" :placeholder="'联系邮箱'" />
    <div class="footer">
      <hoo-button :text="'提交'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
    <hoo-feedback :text="'反馈成功'"></hoo-feedback>
  </div>
</template>
<script>
import * as MutationType from '@/store/mutation.type';
import hooButton from '@/components/button';
import hooFeedback from '@/components/feedback';

export default {
  components: {
    hooButton,
    hooFeedback
  },
  data () {
    return {
      descVal: '',
      emailVal: '',
      exp: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z]{2,5}$/
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('意见反馈');
  },
  methods: {
    inputDesc (e) {
      this.descVal = e.mp.detail.value;
    },

    inputEmail (e) {
      this.emailVal = e.mp.detail.value;
    },

    submit () {
      if (!this.exp.test(this.emailVal)) {
        this.$wxUtils.toast({title: '请输入正确的邮箱'});
        return;
      }
      if (this.descVal === '') {
        this.$wxUtils.toast({title: '请输入反馈描述'});
        return;
      }
      let requestParams = {
        'content': this.descVal,
        'email': this.emailVal
      };
      // console.log(requestParams);
      this.$network.account.postFeedback({entity: requestParams}).then(res => {
        // console.log(res);
        if (res.e === 0) {
          this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, feedback: true});
          setTimeout(() => {
            this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: false, feedback: false});
            this.$router.go(2);
          }, 3000);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .feedback-container {
    padding: 0 40rpx;
    background-color: #ffffff;
    min-height: 100vh;

    .textarea {
      padding: 40rpx;
      border: 1rpx solid #e3e3e3;
      background-color: #fbfbfb;
      border-radius: 16rpx;
    }

    .desc {
      width: calc(100% - 80rpx);
      height: 320rpx;
    }

    .email {
      margin-top: 30rpx;
    }

    .footer {
      width: calc(100vw - 80rpx);
      position: fixed;
      bottom: 40rpx;
      left: 40rpx;
    }
  }
</style>
