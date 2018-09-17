<template>
  <div class="button-container">
    <div class="btn-item normal" v-if="type === 'normal'" @click="tapButton">{{text || '测试'}}</div>
    <div class="btn-item topic" v-if="type === 'topic'" @click="tapButton">{{text || '测试'}}</div>
  </div>
</template>
<script>
export default {
  props: ['text', 'type'],
  methods: {
    tapButton () {
      this.$emit('tapButton');
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
    }

    .normal {
      color: #000000;
      background-color: #ffffff;
    }

    .topic {
      color: #ffffff;
      background-color: $topic-color;
    }
  }
</style>
