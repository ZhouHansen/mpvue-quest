<template>
  <div class="course-list-container">
    <div v-for="(item, index) in params" :key="index" v-if="params && params.length > 0">
      <hoo-discovery :section-data="item" :location="location" :un-show-organ="true"></hoo-discovery>
    </div>
    <hoo-empty :type="'normal'" :text="'没有相关数据~'" v-if="params.length === 0 || !params"></hoo-empty>
  </div>
</template>
<script>
  import hooEmpty from '@/components/empty';
  import hooDiscovery from '@/module/discovery/section.item';

  export default {
    props: ['params'],
    components: {
      hooDiscovery,
      hooEmpty
    },
    data () {
      return {
        location: this.$storage.get(this.$storageTypeName.location)
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .course-list-container {
  }
</style>
