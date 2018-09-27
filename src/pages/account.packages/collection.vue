<template>
  <div class="collection-container">
      <hoo-nav @tapNavItem="chooseNav" :tabs="tabData"></hoo-nav>
      <div class="show-content" v-if="chooseNavIndex === '0'">
        <course-list></course-list>
      </div>
      <div class="show-content" v-if="chooseNavIndex === '1'">
        <teacher-list></teacher-list>
      </div>
      <div class="show-content" v-if="chooseNavIndex === '2'">
        <organization-list></organization-list>
      </div>
  </div>
</template>
<script>
  import hooNav from '@/components/nav';
  import courseList from '@/module/course/course.list';
  import organizationList from '@/module/organization/organization.list';
  import teacherList from '@/module/teacher/teacher.list';
  export default {
    components: {
      hooNav,
      courseList,
      organizationList,
      teacherList
    },
    props: [],
    data () {
      return {
        tabData: ['课程', '老师', '机构'],
        chooseNavIndex: '0'
      };
    },
    onShow () {
      this.chooseNavIndex = '0';
    },
    methods: {
      chooseNav (e) {
        console.log('接收到点击的nav', e);
        this.chooseNavIndex = e;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .collection-container {
    .show-content {
      height: calc(100vh - 96rpx);
      overflow: auto;
    }
  }
</style>
