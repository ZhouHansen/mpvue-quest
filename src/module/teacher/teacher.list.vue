<template>
  <div class="teacher-list-container">
    <hoo-teacher></hoo-teacher>
    <hoo-teacher></hoo-teacher>
    <hoo-teacher></hoo-teacher>
  </div>
</template>
<script>
  import hooTeacher from '@/module/teacher/teacher';

  export default {
    components: {
      hooTeacher
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .teacher-list-container {
  }
</style>
