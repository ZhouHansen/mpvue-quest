<template>
  <div class="organi-list-container">
    <hoo-organi-item v-if="params && params.length > 0" v-for="item in params" :key="item.id" :organi-data="item"></hoo-organi-item>
    <hoo-empty :type="'normal'" :text="'~未找到机构信息~'" v-if="params.length === 0 || !params"></hoo-empty>
  </div>
</template>
<script>
  import hooEmpty from '@/components/empty';
  import hooOrganiItem from '@/module/organization/organization.item';

  export default {
    props: ['params'],
    components: {
      hooOrganiItem,
      hooEmpty
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .organi-list-container {
  }
</style>
