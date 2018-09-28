<template>
  <div class="teacher-container">
    <div class="nav-body">
      <hoo-nav :tabs="navData" @tapNavItem="chooseNav"></hoo-nav>
    </div>
    <div class="teacher-list-body">
      <teacher-list></teacher-list>
    </div>
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
      navData: ['全部', '美术', '英文', '中文', '数学', '音乐'],
      chooseNavIndex: 0
    };
  },
  onShow () {
    // 初始化的搜索老师条件。
  },
  onReachBottom () {
    console.log('到底了');
  },
  methods: {
    chooseNav (e) {
      this.chooseNavIndex = e;
      this.$wxUtils.loading({title: '加载中...'});
      setTimeout(() => {
        this.$wxUtils.loading({show: false});
      }, 3000);
    }
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .teacher-container {
    // .nav-body {
    //   border-bottom: 1rpx solid #bfbfbf;
    // }

    // .teacher-list-body {
    //   height: calc(100vh - 96rpx);
    //   overflow-y: auto;
    // }
  }
</style>
