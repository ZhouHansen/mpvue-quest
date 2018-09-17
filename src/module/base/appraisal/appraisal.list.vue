<template>
  <div class="appra-list-container">
    <hoo-appra-item></hoo-appra-item>
  </div>
</template>
<script>
import hooAppraItem from '@/module/base/appraisal/appraisal.item';

export default {
  props: [],
  components: {
    hooAppraItem
  }
};
</script>
<style lang="scss" scoped>
  .appra-list-container {
  }
</style>
