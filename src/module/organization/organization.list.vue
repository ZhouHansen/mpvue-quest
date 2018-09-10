<template>
  <div class="organi-list-container">
    <hoo-organi-item></hoo-organi-item>
    <hoo-organi-item></hoo-organi-item>
    <hoo-organi-item></hoo-organi-item>
  </div>
</template>
<script>
  import hooOrganiItem from '@/module/organization/organization.item';

  export default {
    components: {
      hooOrganiItem
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .organi-list-container {
  }
</style>
