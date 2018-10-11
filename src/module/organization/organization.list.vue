<template>
  <div class="organi-list-container">
    <hoo-organi-item v-for="item in params" :key="item.id" :organi-data="item"></hoo-organi-item>
  </div>
</template>
<script>
  import hooOrganiItem from '@/module/organization/organization.item';

  export default {
    props: ['params'],
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
