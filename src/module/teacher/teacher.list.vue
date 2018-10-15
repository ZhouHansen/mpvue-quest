<template>
  <div class="teacher-list-container">
    <hoo-teacher-item v-for="item in params" :key="item.id" :detail="item"></hoo-teacher-item>
    <hoo-empty :type="'normal'" :text="'~未找到老师信息~'" v-if="params.length === 0 || !params"></hoo-empty>
  </div>
</template>
<script>
  import hooEmpty from '@/components/empty';
  import hooTeacherItem from '@/module/teacher/teacher.item';

  export default {
    props: ['params'],
    components: {
      hooTeacherItem,
      hooEmpty
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .teacher-list-container {
  }
</style>
