<template>
  <div class="teacher-container">
    <div class="nav-body">
      <hoo-nav :tabs="navData" @tapNavItem="chooseNav" :unOnShowDefault="true"></hoo-nav>
    </div>
    <div class="teacher-list-body">
      <teacher-list :params="teacherListData"></teacher-list>
    </div>
  </div>
</template>
<script>
import {SubjectsFilterData} from '@/utils/default.data';
import hooNav from '@/components/nav';
import teacherList from '@/module/teacher/teacher.list';

export default {
  components: {
    hooNav,
    teacherList
  },
  data () {
    return {
      navData: [],
      chooseNavIndex: 0,
      teacherListData: [],
      limit: 15,
      offset: 0,
      total: 0
    };
  },
  mounted () {
    SubjectsFilterData.forEach((item, index) => {
      this.navData.push(item.text);
    });
  },
  onShow () {
    this.getTeacherList();
    // 初始化的搜索老师条件。
  },
  onReachBottom () {
    if (this.total > this.limit) {
      this.limit = this.limit + 15;
      this.getTeacherList();
    }
  },
  methods: {
    chooseNav (e) {
      this.limit = 15;
      this.chooseNavIndex = e;
      this.getTeacherList();
    },

    getTeacherList () {
      this.$wxUtils.loading({title: '加载中...'});
      let requestParams = {
        limit: this.limit,
        offset: this.offset,
        subjects: this.chooseNavIndex > 0 ? this.navData[this.chooseNavIndex] : undefined
      };

      this.$network.teacher.getTeacherList(requestParams).then(res => {
        // console.log(res);
        this.$wxUtils.loading({show: false});
        this.teacherListData = res.data;
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
