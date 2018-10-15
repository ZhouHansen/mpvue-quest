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
import _ from 'lodash/core';
import {SubjectsFilterData} from '@/utils/default.data';
import Utils from '@/utils/index';
import hooNav from '@/components/nav';
import teacherList from '@/module/teacher/teacher.list';

export default {
  components: {
    hooNav,
    teacherList
  },
  data () {
    return {
      // navData: [],
      chooseNavIndex: 0,
      teacherListData: [],
      limit: 15,
      offset: 0,
      total: 0
    };
  },
  computed: {
    navData () {
      let result = [];
      SubjectsFilterData.forEach((item, index) => {
        result.push(item.text);
      });
      return result;
    }
  },
  mounted () {

  },
  onShow () {
    // 初始化的搜索老师条件。
    this.getTeacherList();
  },
  onReachBottom () {
    if (this.total > this.offset) {
      this.offset = this.offset + this.limit;
      this.getTeacherList();
    }
  },
  methods: {
    chooseNav (e) {
      this.offset = 0;
      this.chooseNavIndex = e;
      this.teacherListData = [];
      this.getTeacherList();
    },

    getTeacherList () {
      this.$wxUtils.loading({title: '加载中...'});
      let requestParams = {
        limit: this.limit,
        offset: this.offset
      };

      if (this.chooseNavIndex > 0) {
        let result = _.find(SubjectsFilterData, (item, index) => {
          return item.text === this.navData[this.chooseNavIndex];
        });

        requestParams['subjects'] = result.id;
      }

      this.$network.teacher.getTeacherList(requestParams).then(res => {
        // console.log(res);
        this.$wxUtils.loading({show: false});
        this.teacherListData = Utils.filterRepeatData(this.teacherListData, res.data);
        console.log(this.teacherListData);
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
