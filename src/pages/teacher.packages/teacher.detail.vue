<template>
  <div class="teacher-detail-container" v-if="teacherData">
      <div class="teacher-detail-header">
        <div class="detail-left">
          <div class="detail-left-avatar">
            <hoo-avatar :type="'big'" :avatar="teacherData.avatarurl"></hoo-avatar>
          </div>
          <hoo-score :score="teacherData.star" :type="'show'" :size="'small'"></hoo-score>
        </div>
        <div class="detail-right">
          <div class="detail-right-name">
            <span class="detail-right-name-text">{{teacherData.name}}</span>
            <hoo-auth v-if="teacherData.endorsed"></hoo-auth>
          </div>
          <div class="detail-deucation">{{teacherData.education}}</div>
          <hoo-label :type-text="teacherLabelTypeText" :label-arr="teacherLabelArr" :type="'teacher'"></hoo-label>
          <div class="detail-ctrl">
            <div class="collect-btn">
              <hoo-have-icon-btn :type="'collection'"></hoo-have-icon-btn>
            </div>
            <hoo-have-icon-btn :type="'share'"></hoo-have-icon-btn>
          </div>
        </div>
      </div>
      <hoo-nav :tabs="navData" :unOnShowDefault="'true'"  @tapNavItem="chooseNav"></hoo-nav>
      <div class="tearcher-detail-course" v-if="chooseNavNumber === '0'">
        <course-list :params="courseData" v-if="courseData"></course-list>
      </div>
      <div class="teacher-detail-text" v-if="chooseNavNumber === '1'">
        <teacher-introduction :params="teacherData"></teacher-introduction>
      </div>
      <div class="teacher-detail-appraise" v-if="chooseNavNumber === '2'">
        <appra-list></appra-list>
      </div>
  </div>
</template>
<script>
  import hooLabel from '@/components/label';
  import hooAvatar from '@/components/avatar';
  import hooScore from '@/components/score';
  import hooHaveIconBtn from '@/components/have.icon.btn';
  import hooNav from '@/components/nav';
  import hooAuth from '@/components/auth';
  import appraList from '@/module/base/appraisal/appraisal.list';
  import courseList from '@/module/course/course.list';
  import teacherIntroduction from '@/module/teacher/teacher.introduction';

  export default {
    components: {
      hooLabel,
      hooAvatar,
      hooScore,
      hooHaveIconBtn,
      hooNav,
      hooAuth,
      appraList,
      courseList,
      teacherIntroduction
    },
    data () {
      return {
        teacherLabelTypeText: null,
        teacherLabelArr: null,
        navData: ['课程', '老师介绍', '评价'],
        chooseNavNumber: '0',
        teacherData: null,
        courseData: null,
        course: {
          limit: 15,
          offset: 0,
          total: 0
        }
      };
    },
    onShow () {
    },
    mounted () {
      this.$wxUtils.setNavTitle('老师详情');
      this.getTeacherDetail();
    },
    methods: {
      chooseNav (e) {
        this.chooseNavNumber = e;
      },

      getTeacherDetail () {
        this.$network.teacher.getTeacherDetail({}, null, 'weapp/teacher/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.teacherData = res.data;
          this.teacherLabelTypeText = res.data.subjectslist;
          this.teacherLabelArr = res.data.tagslist;

          this.getTeacherCourseList();
        });
      },

      getTeacherCourseList () {
        let requestParams = {
          tid: this.$route.query.id,
          limit: this.course.limit,
          offset: this.course.offset
        };

        this.$network.search.searchCourse(requestParams).then(res => {
          this.courseData = res.data;
          this.course.total = res.total;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    onReachBottom () {
      if (this.course.total > this.course.limit) {
        this.course.limit = this.course.limit + 15;
        this.getTeacherCourseList();
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log(res.target);
      }
      return {
        title: 'Hooray - ' + this.teacherData.name,
        path: '/pages/teacher.packages/teacher.detail?id=' + this.teacherData.id,
        imageUrl: this.teacherData.avatarurl
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .teacher-detail-container {
    .teacher-detail-header {
      @include flex(flex-start);
      padding: 40rpx 40rpx 40rpx 80rpx;

      .detail-left {
        margin-right: 30rpx;
        flex-shrink: 0;

        .detail-left-avatar {
          padding-bottom: 20rpx;
        }
      }

      .detail-right {
        flex-basis: 100%;

        .detail-right-name {
          @include flex();

          .detail-right-name-text {
            font-size: 18px;
            font-weight: bold;
          }
        }

        .detail-deucation {
          font-size: 12px;
          color: #9F9F9F;
          margin-top: 6rpx;
        }

        .detail-ctrl {
          @include flex(flex-start);
          margin-top: 20rpx;

          .collect-btn {
            margin-right: 16rpx;
          }
        }
      }
    }
  }
</style>
