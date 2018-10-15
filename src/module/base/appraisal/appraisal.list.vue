<template>
  <div class="appra-list-container">
    <hoo-appra-item v-if="params && params.length > 0" :params-detail="params"></hoo-appra-item>
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
  }
};
</script>
<style lang="scss" scoped>
  .appra-list-container {
  }
</style>
