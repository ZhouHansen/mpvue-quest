<template>
  <div class="feedback-container" v-if="showDialogStatus.feedback">
    <div class="feedback-content">
      <div class="feedback-icon"></div>
      <div class="feedback-text">{{text}}</div>
    </div>
    <hoo-dialog-bg></hoo-dialog-bg>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import hooDialogBg from '@/components/dialog.bg';

  export default {
    props: ['text'],
    components: {
      hooDialogBg
    },
    computed: mapState([
      // 映射 this.showDialogStatus 为 store.state.showDialogStatus
      'showDialogStatus'
    ]),
    data () {
      return {
      };
    }
  };
</script>

<style lang="scss" scope>
  @import '../assets/style/variables.scss';
  .feedback-container {
    .feedback-content {
      position: fixed;
      width: calc(60vw - 200rpx);
      left: 20vw;
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 80rpx 100rpx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 999;

      .feedback-icon {
        width: 30vw;
        height: 30vw;
        @include backgroundImg('../assets/images/big_right.png');
        margin: 0 auto;
      }

      .feedback-text {
        text-align: center;
        color: #000000;
        font-size: 18px;
        font-size: bold;
      }
    }
  }
</style>
