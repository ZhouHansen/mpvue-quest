<template>
  <cover-view class="organi-filter-button-container" :class="data.type" @click="tapFilterButton">
    <cover-view class="filter-text">{{data.text}}</cover-view>
    <cover-image :src="'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-19_172403.104202.png'" :mode="Fillescpt" class="filter-icon"></cover-image>
  </cover-view>
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
    };
  },
  methods: {
    tapFilterButton () {
      this.$emit('filterButton', this.data.type);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .organi-filter-button-container {
    position: fixed;
    top: 40rpx;
    padding: 14rpx 24rpx;
    border: 1rpx solid #bfbfbf;
    border-radius: 32rpx;
    background-color: #ffffff;
    @include flex();

    .filter-text {
      margin-right: 20rpx;
      color: #454545;
    }

    .filter-icon {
      width: 24rpx;
      height: 12rpx;
    }
  }

  .type {
    left: 208rpx;
  }

  .city {
    left: 40rpx;
  }
</style>
