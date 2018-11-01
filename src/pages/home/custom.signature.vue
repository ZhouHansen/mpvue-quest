<template>
  <div class="signature-container">
    <div class="signature-content">
      <div class="input-item">
        <div class="input-item-title">签名内容</div>
        <div class="input-item-from">
          <input type="text" placeholder="祝福语" :value="text" v-model="text" @change="inputText">
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-title">给予</div>
        <div class="input-item-from">
          <input type="text" placeholder="要给予人的姓名" :value="name" v-model="name" @change="inputName">
        </div>
      </div>
    </div>
    <div class="submit-signature">
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
  </div>
</template>
<script>
import * as MutationsType from '@/store/mutation.type';
import hooButton from '@/components/button';
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('discovery');

export default {
  props: [],
  components: {
    hooButton
  },
  data () {
    return {
      text: '',
      name: ''
    };
  },
  computed: {
    ...mapState({
      text: state => state.customSign.text,
      name: state => state.customSign.name
    })
  },
  mounted () {
    this.$wxUtils.setNavTitle('编辑签名');
  },
  methods: {
    inputText (e) {
      this.text = e.mp.detail.value;
    },

    inputName (e) {
      this.name = e.mp.detail.value;
    },

    submit () {
      if (this.text === '' || this.name === '') {
        this.$wxUtils.toast({title: '请输入文字'});
        return;
      };
      this.$store.commit(MutationsType.SET_ORDER_PARAMS, {
        customSign: {
          text: this.text,
          name: this.name
        }
      });
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .signature-container {
    min-height: 100vh;
    background-color: #f9f9f9;

    .signature-content {
      padding: 80rpx 80rpx 40rpx 80rpx;
      background-color: #ffffff;
      font-size: 16px;

      .input-item {
        margin-top: 30rpx;
        padding-bottom: 30rpx;
        border-bottom: 1rpx solid #eaeaea;
        @include flex();

        .input-item-title {
          color: #454545;
          flex-shrink: 0;
          margin-right: 80rpx;
        }

        .input-item-from {
          flex-basis: 80%;

          input {
            font-size: 16px;
          }
        }
      }
    }

    .submit-signature {
      position: fixed;
      bottom: 40rpx;
      left: 0;
      margin: 0 40rpx;
      width: calc(100vw - 80rpx);
    }
  }
</style>
