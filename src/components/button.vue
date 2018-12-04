<template>
  <div class="button-container">
    <div class="btn-item normal" v-if="type === 'normal'" @click="tapButton">{{text || '测试'}}</div>
    <div class="btn-item topic" v-if="type === 'topic'" @click="tapButton">{{text || '测试'}}</div>
    <div class="btn-item topic-unchecked" v-if="type === 'topic-unchecked'" @click="tapButton">{{text || '测试'}}</div>
    <div class="btn-form-id" v-if="type === 'topic-formId'">
      <form @submit="tapButton" report-submit='true' >
        <button form-type="submit" type="default" size="mini" class="topic payment-button">{{text || '去支付'}}</button>
      </form>
    </div>

  </div>
</template>
<script>
import Utils from '@/utils/index';

export default {
  props: ['text', 'type'],
  methods: {
    tapButton (e) {
      if (e && e.mp.detail.formId) {
        Utils.storageFormId(e.mp.detail.formId).then(res => {
          this.$emit('tapButton');
        });
      } else {
        this.$emit('tapButton');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .button-container {
    .btn-item {
      padding: 26rpx 0;
      width: 100%;
      text-align: center;
      font-size: 16px;
      border-radius: 48rpx;
      overflow: hidden;
      box-shadow: 0 4rpx 8rpx #e3e3e3;
    }

    .normal {
      color: #000000;
      background-color: #ffffff;
      border: 1rpx solid #ededed;
      // box-shadow: 0 4rpx 8rpx #e3e3e3;
    }

    .topic {
      color: #ffffff;
      background-color: $topic-color;
    }

    .topic-unchecked {
      color: $topic-color;
      border: 1rpx solid $topic-color;
      background-color: transparent;
    }

    .btn-form-id {
      button {
        padding: 26rpx 0;
        width: 100%;
        text-align: center;
        font-size: 16px;
        border-radius: 48rpx;
        overflow: hidden;
        line-height: normal;
        box-shadow: 0 4rpx 8rpx #e3e3e3;
      }
    }
  }
</style>
