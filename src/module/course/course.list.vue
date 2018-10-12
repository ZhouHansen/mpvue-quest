<template>
  <div class="course-list-container">
    <div v-for="(item, index) in params" :key="index" v-if="params && params.length > 0">
      <hoo-course-item :course-data="item"></hoo-course-item>
    </div>
    <hoo-empty :type="'normal'" :text="'未找到课程信息~'" v-if="params.length === 0 || !params"></hoo-empty>
  </div>
</template>
<script>
  import hooEmpty from '@/components/empty';
  import hooCourseItem from '@/module/course/course.item';

  export default {
    props: ['params'],
    components: {
      hooCourseItem,
      hooEmpty
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
