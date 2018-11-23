<template>
  <div class="group-order-container" v-if="showDialogStatus.groupOrder">
    <div class="group-order-section">
      <div class="group-title">{{params.tag}}</div>
      <div class="group-desc">
        <div>发起拼团课程后，请先支付订单，若最终不能拼团，则自动退款！</div>
        <div>报名结束时间：{{params.lastday}}</div>
      </div>
      <div class="group-ctrl">
        <div class="first-ctrl ctrl-item" @click="chooseOrderType" :id="params.id">
          <span>{{params.minps}}人 - {{params.maxps}}人</span>
          <span>¥{{params.price / 100}}/人</span>
        </div>
      </div>
    </div>
    <hoo-dialog-bg></hoo-dialog-bg>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import * as MutationType from '@/store/mutation.type';
  import hooDialogBg from '@/components/dialog.bg';

  export default {
    props: ['params'], // 用于显示团购价格
    computed: mapState([
      // 映射 this.showDialogStatus 为 store.state.showDialogStatus
      'showDialogStatus'
    ]),
    components: {
      hooDialogBg
    },
    methods: {
      chooseOrderType (e) {
        this.$emit('chooseGroupType', e.mp.currentTarget.id);
        this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: false, groupOrder: false});
      }
    }
  };
</script>
<style lang="scss" scope>
  @import '../../assets/style/variables.scss';
  .group-order-container {

    animation: fadeIn 0.1s;

    .group-order-section {
      position: fixed;
      width: calc(90vw - 80rpx);
      left: 5vw;
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 40rpx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 999;

      .group-title {
        font-size: 16px;
        color: #000000;
        text-align: center;
      }

      .group-desc {
        margin-top:20rpx;
      }

      .group-ctrl {
        color: #ffffff;
      }

      .ctrl-item {
        background-color: $topic-color;
        padding: 24rpx 48rpx;
        margin-top: 24rpx;
        border-radius: 50rpx;
        @include flex(space-between);
      }
    }
  }
</style>

