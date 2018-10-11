<template>
  <div class="teacher-container">
    <div class="nav-body">
      <hoo-nav :tabs="navData" @tapNavItem="chooseNav"></hoo-nav>
    </div>
    <div class="teacher-list-body">
      <teacher-list :params="teacherListData"></teacher-list>
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
      chooseNavIndex: 0,
      teacherListData: [],
      limit: 15,
      offset: 0,
      total: 0
    };
  },
  mounted () {
  },
  onShow () {
    this.getTeacherList();
    // 初始化的搜索老师条件。
  },
  onReachBottom () {
    if (this.total > this.limit) {
      this.offset = this.offset + 15;
      this.getTeacherList();
    }
  },
  methods: {
    chooseNav (e) {
      this.chooseNavIndex = e;
      this.getTeacherList();
    },

    getTeacherList () {
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.teacher.getTeacherList({offset: this.offset, limit: this.limit}).then(res => {
        // console.log(res);
        this.$wxUtils.loading({show: false});
        this.teacherListData = Object.assign(this.teacherListData, res.data);
        this.total = res.total;
      });
    }
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .teacher-container {
  }
</style>
