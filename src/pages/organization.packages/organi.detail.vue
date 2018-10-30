<template>
  <div class="organi-detail-container">
    <div class="organi-header">
      <div class="organi-avatar">
        <hoo-avatar :avatar="organiData.coverfile"></hoo-avatar>
      </div>
      <div class="organi-header-content">
        <div class="organi-header-title">{{organiData.name}}</div>
        <div class="organi-header-text" :class="showAllBriefStatu?'':'line-clamp-3'" @click="showAllBrief">{{organiData.brief}}</div>
        <div class="organi-header-ctrl">
          <div class="organi-header-ctrl-item">
            <hoo-have-icon-btn :type="organiData.favored === 0 ? 'collection' : 'collection_already'" :id="organiData.id" :subject="'institution'"></hoo-have-icon-btn>
          </div>
          <hoo-have-icon-btn :type="'share'"></hoo-have-icon-btn>
        </div>
      </div>
    </div>

    <div class="organi-content">
      <hoo-nav :tabs="navData" @tapNavItem="chooseNav" :checkIndex="chooseNavNumber" :unOnShowDefault="true"></hoo-nav>
      <div class="organi-nav-inf">
        <scroll-view v-if="chooseNavNumber === '0' && courseData" scroll-y scroll-with-animation @scrolltolower="loadMore">
          <course-list  :params="courseData"></course-list>
        </scroll-view>
        <scroll-view v-if="chooseNavNumber === '1' && teacherData" scroll-y scroll-with-animation @scrolltolower="loadMore">
          <teacher-list  :params="teacherData"></teacher-list>
        </scroll-view>
        <scroll-view v-if="chooseNavNumber === '2'" scroll-y scroll-with-animation @scrolltolower="loadMore">
          <appraisal-list  :params="request.appra.appraListData"></appraisal-list>
        </scroll-view>
        <organi-desc v-if="chooseNavNumber === '3'" :params="organiData"></organi-desc>
      </div>
    </div>
  </div>
</template>
<script>
  import Utils from '@/utils/index';
  import hooAvatar from '@/components/avatar';
  import hooHaveIconBtn from '@/components/have.icon.btn';
  import hooNav from '@/components/nav';
  import courseList from '@/module/course/course.list';
  import teacherList from '@/module/teacher/teacher.list';
  import appraisalList from '@/module/base/appraisal/appraisal.list';
  import organiDesc from '@/module/organization/organization.desc';

  export default {
    components: {
      hooAvatar,
      hooHaveIconBtn,
      hooNav,
      courseList,
      teacherList,
      appraisalList,
      organiDesc
    },
    data () {
      return {
        showAllBriefStatu: false,
        navData: ['课程', '老师', '评价', '关于机构'],
        chooseNavNumber: '0',
        organiData: {},
        courseData: null,
        teacherData: null,
        request: {
          course: {
            limit: 15,
            offset: 0,
            total: 0
          },
          teacher: {
            limit: 15,
            offset: 0,
            total: 0
          },
          appra: {
            appraListData: null,
            limit: 4,
            offset: 0,
            total: 0
          }
        }
      };
    },
    onShow () {
      // this.chooseNavNumber = '0';
    },
    onUnload () {
      this.chooseNavNumber = '0';
    },
    mounted () {
      this.getOrganiDetail();
    },
    methods: {
      showAllBrief () {
        this.showAllBriefStatu = !this.showAllBriefStatu;
      },

      chooseNav (e) {
        this.chooseNavNumber = e;

        if (e === '1' && !this.teacherData) {
          this.getOrganiTeacherList();
        } else
        if (e === '2' && !this.appraListData) {
          this.getOrganiAppraList();
        }
      },

      getOrganiDetail () {
        this.$network.organi.getOrganiDetail({}, null, 'weapp/inst/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.organiData = res.data;
          this.getOrganiCourseList();
        });
      },

      getOrganiCourseList () {
        let requestParams = {
          instid: this.$route.query.id,
          limit: this.request.course.limit,
          offset: this.request.course.offset
        };

        this.$network.search.searchCourse(requestParams).then(res => {
          console.log('返回查找课程数据', res);
          if (!this.courseData) {
            this.courseData = [];
          }
          let result = Utils.filterRepeatData(this.courseData, res.data);
          this.courseData = this.courseData.concat(result);
          this.request.course.total = res.total;
        }).catch(err => {
          console.log(err);
        });
      },

      getOrganiTeacherList () {
        let requestParams = {
          instid: this.$route.query.id,
          limit: this.request.teacher.limit,
          offset: this.request.teacher.offset
        };
        this.$network.search.searchTearch(requestParams).then(res => {
          console.log('返回查找老师数据', res);
          if (!this.teacherData) {
            this.teacherData = [];
          }
          let result = Utils.filterRepeatData(this.teacherData, res.data);
          this.teacherData = this.teacherData.concat(result);
          this.request.teacher.total = res.total;
        }).catch(err => {
          console.log(err);
        });
      },

      getOrganiAppraList () {
        let requestParams = {
          limit: this.request.appra.limit,
          offset: this.request.appra.offset
        };

        this.$network.base.getCommentList(requestParams, null, 'weapp/comments/institution/' + this.$route.query.id).then(res => {
          console.log('获取评价数据', res);
          if (!this.request.appra.appraListData) {
            this.request.appra.appraListData = [];
          }
          let result = Utils.filterRepeatData(this.request.appra.appraListData, res.data);
          this.request.appra.appraListData = this.request.appra.appraListData.concat(result);
          this.request.appra.total = res.total;
        });
      },

      loadMore () {
        let type = '';
        switch (this.chooseNavNumber) {
        case '0':
          type = 'course';
          break;
        case '1':
          type = 'teacher';
          break;
        case '2':
          type = 'appra';
          break;
        };

        if (this.request[type].total > this.request[type].offset + this.request[type].limit) {
          this.request[type].offset = this.request[type].offset + this.request[type].limit;
          if (type === 'course') {
            this.getOrganiCourseList();
          } else
          if (type === 'teacher') {
            this.getOrganiTeacherList();
          } else
          if (type === 'appra') {
            this.getOrganiAppraList();
          }
        }
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
        this.$network.base.recordShare({}, null, 'weapp/share/institution/' + this.$route.query.id);
      }
      return {
        title: 'Hooray - ' + this.organiData.name,
        path: '/pages/organization.packages/organi.detail?id=' + this.organiData.id,
        imageUrl: this.organiData.coverfile2
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .organi-detail-container {
    .organi-header {
      @include flex(flex-start, flex-start);
      padding: 40rpx;

      .organi-avatar {
        flex-shrink: 0;
        margin-right: 30rpx;
      }

      .organi-header-content {
        .organi-header-title {
          font-size: 18px;
          font-weight: bold;
        }

        .organi-header-text {
          color: #9F9F9F;
        }

        .organi-header-ctrl {
          margin-top: 30rpx;
          @include flex(flex-start);

          .organi-header-ctrl-item {
            margin-right: 16rpx;
          }
        }
      }
    }

    .organi-content {
      border-top: 20rpx solid #f9f9f9;

      .organi-nav-inf scroll-view{
        max-height: calc(100vh - 110rpx);
      }
    }
  }
</style>
