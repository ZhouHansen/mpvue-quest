<template>
  <div class="course-item-container" @click="visitCourseDetail">
    <div class="course-cover" :style="{background: 'url(' + courseData.coverfile + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
    <div class="course-inf">
      <div class="course-title">{{courseData.name}}</div>
      <hoo-label :type-text="courseData.tags[0]" :label-arr="teacherLabelArr"></hoo-label>
    </div>
    <div class="course-join">{{courseData.favorcount === 0?'好多':courseData.favorcount}}人想参加</div>
  </div>
</template>
<script>
  import hooLabel from '@/components/label';

  export default {
    props: ['courseData'],
    components: {
      hooLabel
    },
    data () {
      return {
        teacherLabelArr: this.courseData.tags.slice(1)
      };
    },
    methods: {
      visitCourseDetail () {
        this.$router.push({path: '/pages/home/section.detail', query: {id: this.courseData.id}});
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .course-item-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    border-top: $searchItemTopBorder;
    padding: 40rpx;
    position: relative;

    .course-cover {
      width: 240rpx;
      height: 240rpx;
      border-radius: 16rpx;
      margin-right:40rpx;
      flex-shrink: 0;
    }

    .course-title {
      font-size: 18px;
      color: $searchTitleColor;
      font-weight: bold;
    }

    .course-join {
      text-align: right;
      color: #9f9f9f;
      margin-top: 40rpx;
      position: absolute;
      bottom: 45rpx;
      right: 45rpx;
    }
  }
</style>
