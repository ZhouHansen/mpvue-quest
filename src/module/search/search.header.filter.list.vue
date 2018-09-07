<template>
  <div class="search-filter-container">
    <div class="filter-list">
      <div class="filter-item">item1</div>
      <div class="filter-item filter-checked" @click="chooseFilterParam('item3')">item3</div>
    </div>
  </div>
</template>
<script>
import * as MutationsType from '@/store/mutation.type';

export default {
  props: ['filter'],
  methods: {
    chooseFilterParam (e) {
      this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
      console.log('发送的过滤参数', e);
      this.$emit('chooseFilterDone', e);
    }
  }
};
</script>
<style lang="scss" scoped>
  .search-filter-container {
    width: 100%;
    position: absolute;
    top: 0;
    height: 100vh;
    color: #9f9f9f;
    background-color:#fff;
    z-index: 2;

    .filter-list {
      .filter-item {
        padding: 24rpx 40rpx;
        border-bottom: 1rpx solid #e1e1e1;
      }

      .filter-checked {
        color: #000000;
      }
    }
  }
</style>
