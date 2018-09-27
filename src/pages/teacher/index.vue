<template>
  <div class="teacher-container">
    <hoo-nav :tabs="navData"></hoo-nav>
    <teacher-list></teacher-list>
  </div>
</template>
<script>
import hooNav from '@/components/nav';
import teacherList from '@/module/teacher/teacher.list';

export default {
  components: {
    hooNav,
    teacherList
  },
  data () {
    return {
      navData: ['全部', '美术', '英文', '中文', '数学']
    };
  },
  onShow () {
    // 初始化的搜索老师条件。
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .teacher-container {
  }
</style>
