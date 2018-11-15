<template>
  <div class="teacher-container" :class="{'overflow-hidden':isOverflow}">
    <div class="nav-body">
      <div class="teacher-filter-list">
        <div class="teacher-filter-item" @click="chooseFilter('course_type')">
          <div class="filter-item-select">
            <hoo-select :filter="{text:'学科', event: 'course_type'}"></hoo-select>
          </div>
        </div>
        <div class="teacher-filter-item" @click="chooseFilter('teacher_age')">
          <div class="filter-item-select">
            <hoo-select :filter="{text:'教龄', event: 'teacher_age'}"></hoo-select>
          </div>
        </div>
        <div class="teacher-filter-item" @click="chooseFilter('teacher_degree')">
          <div class="filter-item-select">
            <hoo-select :filter="{text:'学位', event: 'teacher_degree'}"></hoo-select>
          </div>
        </div>
      </div>
      <div class="teacher-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
    </div>
    <div class="teacher-list-body">
      <teacher-list :params="teacherListData"></teacher-list>
    </div>
    <hoo-scrolltop></hoo-scrolltop>
  </div>
</template>
<script>
import * as MutationsType from '@/store/mutation.type';
import {SubjectsFilterData, TeacherDegreeData, TeacheAgeData} from '@/utils/default.data';
import Utils from '@/utils/index';
import hooSelect from '@/components/select';
import hooScrolltop from '@/components/scrolltop';
import filterList from '@/module/search/search.header.filter.list';
import teacherList from '@/module/teacher/teacher.list';

export default {
  components: {
    hooSelect,
    filterList,
    teacherList,
    hooScrolltop
  },
  data () {
    return {
      teacherListData: [],
      limit: 15,
      offset: 0,
      total: 0,
      showFilterItemDesc: false,
      chooseFilterType: '',
      filterData: {
        course_type: SubjectsFilterData,
        teacher_degree: TeacherDegreeData,
        teacher_age: TeacheAgeData
      },
      chooseFilterData: null,
      checkedFilter: {}
    };
  },
  computed: {
    isOverflow: function () {
      return this.$store.state.search.isOverFlowStatu;
    },
    navData () {
      let result = [];
      SubjectsFilterData.forEach((item, index) => {
        result.push(item.text);
      });
      return result;
    }
  },
  mounted () {
    this.$wxUtils.setNavTitle('老师');
  },
  onShow () {
    // 初始化的搜索老师条件。
    this.getTeacherList();
  },
  onReachBottom () {
    if (this.total > this.offset + this.limit) {
      this.offset = this.offset + this.limit;
      this.getTeacherList();
    }
  },
  methods: {

    chooseFilter (e) {
      if (this.chooseFilterType === '') {
        this.chooseFilterType = e;
        this.showFilterItemDesc = true;
        this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
      } else
      if (this.chooseFilterType === e) {
        this.showFilterItemDesc = !this.showFilterItemDesc;
        this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, this.showFilterItemDesc);
        return false;
      } else
      if (this.chooseFilterType !== e) {
        this.chooseFilterType = e;
        this.showFilterItemDesc = true;
        this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
      }

      this.chooseFilterData = this.filterData[this.chooseFilterType];

      if (!this.checkedFilter[this.chooseFilterType]) {
        this.checkedFilter[this.chooseFilterType] = {
          type: this.chooseFilterType,
          id: null
        };
      }
    },

    doneChooseFilter (e) {
      // console.log('接收到的过滤参数', e);
      this.limit = 15;
      this.total = 0;

      let params = {
        type: this.chooseFilterType
      };

      if (this.checkedFilter[this.chooseFilterType].id !== e.id) {
        params = Object.assign(params, e);
        this.checkedFilter[this.chooseFilterType] = params;
      } else {
        this.checkedFilter[this.chooseFilterType] = params;
      }
      this.showFilterItemDesc = false;
      this.teacherListData = [];
      this.getTeacherList();
    },

    getTeacherList () {
      this.$wxUtils.loading({title: '加载中...'});
      let requestParams = {
        limit: this.limit,
        offset: this.offset,
        subjects: this.checkedFilter.course_type && this.checkedFilter.course_type.id ? this.checkedFilter.course_type.id : undefined,
        teachagegte: this.checkedFilter.teacher_age && this.checkedFilter.teacher_age.id ? this.checkedFilter.teacher_age.id : undefined,
        degree: this.checkedFilter.teacher_degree && this.checkedFilter.teacher_degree.id ? this.checkedFilter.teacher_degree.id : undefined
      };

      this.$network.teacher.getTeacherList(requestParams).then(res => {
        // console.log(res);
        this.$wxUtils.loading({show: false});
        if (!this.teacherListData) {
          this.teacherListData = [];
        }
        let result = Utils.filterRepeatData(this.teacherListData, res.data);
        this.teacherListData = this.teacherListData.concat(result);
        // console.log(this.teacherListData);
        this.total = res.total;
      });
    }
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .teacher-container {

    .teacher-filter-list {
      @include flex(space-between, center);
      padding: 0 20rpx;


      .teacher-filter-item {
        width: 50%;
        padding: 24rpx 0;

        .filter-item-select {
          padding: 0 4vw;
          border-right: 1rpx solid #f2f2f2;
        }

        &:last-child .filter-item-select {
          border: 0;
        }
      }
    }

    .teacher-filter-item-desc {
      position: relative;
      height: 100vh;
      border-top: 1rpx solid #dcdcdc;
    }
  }
</style>
