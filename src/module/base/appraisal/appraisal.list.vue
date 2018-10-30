<template>
  <div class="appra-list-container">
    <hoo-appra-item v-for="item in params" :key="item.id" :params-detail="item"></hoo-appra-item>
    <hoo-empty :text="'还没有评价~'" v-if="!params || params.length === 0"></hoo-empty>
  </div>
</template>
<script>
import hooEmpty from '@/components/empty';
import hooAppraItem from '@/module/base/appraisal/appraisal.item';

export default {
  props: ['params'],
  components: {
    hooAppraItem,
    hooEmpty
  },
  mounted () {
    console.log('评价列表', this.params);
  }
};
</script>
<style lang="scss" scoped>
  .appra-list-container {
    padding-bottom: 100rpx;
  }
</style>
