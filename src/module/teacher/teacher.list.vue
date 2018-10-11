<template>
  <div class="teacher-list-container">
    <hoo-teacher-item v-for="item in params" :key="item.id" :params="item"></hoo-teacher-item>
  </div>
</template>
<script>
  import hooTeacherItem from '@/module/teacher/teacher.item';

  export default {
    props: ['params'],
    components: {
      hooTeacherItem
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .teacher-list-container {
  }
</style>
