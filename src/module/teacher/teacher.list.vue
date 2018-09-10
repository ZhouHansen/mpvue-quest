<template>
  <div class="teacher-list-container">
    <hoo-teacher-item></hoo-teacher-item>
    <hoo-teacher-item></hoo-teacher-item>
    <hoo-teacher-item></hoo-teacher-item>
  </div>
</template>
<script>
  import hooTeacherItem from '@/module/teacher/teacher.item';

  export default {
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
