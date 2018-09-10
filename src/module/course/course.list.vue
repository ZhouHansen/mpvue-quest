<template>
  <div class="course-list-container">
    <div v-for="(item, index) in courseList" :key="index">
      <hoo-course-item :course-data="item"></hoo-course-item>
    </div>
  </div>
</template>
<script>
  import hooCourseItem from '@/module/course/course.item';

  export default {
    components: {
      hooCourseItem
    },
    data () {
      return {
        courseList: [
          {title: '2018招牌通识营-在创造中原力觉醒', num: 100, avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'},
          {title: '暑期儿童编程入门', num: 100, avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'},
          {title: '书籍套装', num: 100, avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'},
          {title: '暑期儿童编程入门', num: 100, avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'},
          {title: '暑期儿童编程入门', num: 100, avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'}
        ]
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .course-list-container {
  }
</style>
