<template>
  <div class="course-list-container">
    <hoo-course-item></hoo-course-item>
    <hoo-course-item></hoo-course-item>
  </div>
</template>
<script>
  import hooCourseItem from '@/module/course/course.item';

  export default {
    components: {
      hooCourseItem
    }
  };
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .course-list-container {
  }
</style>
