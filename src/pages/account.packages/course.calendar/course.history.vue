<template>
  <div class="course-history-container">
    <course-list></course-list>
  </div>
</template>
<script>
import courseList from '@/module/course/course.list';

export default {
  components: {
    courseList
  },
  props: [''],
  mounted () {
    this.$wxUtils.setNavTitle('学习记录');
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .course-history-container {
  }
</style>
