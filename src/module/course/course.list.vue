<template>
  <div class="course-list-container">
    <div v-for="(item, index) in params" :key="index">
      <hoo-course-item :course-data="item"></hoo-course-item>
    </div>
  </div>
</template>
<script>
  import hooCourseItem from '@/module/course/course.item';

  export default {
    props: ['params'],
    components: {
      hooCourseItem
    },
    data () {
      return {
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .course-list-container {
  }
</style>
