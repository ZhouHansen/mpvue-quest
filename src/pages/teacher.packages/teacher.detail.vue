<template>
  <div class="teacher-detail-container" v-if="teacherData">
      <div class="teacher-detail-header">
        <div class="detail-left">
          <div class="detail-left-avatar">
            <img class="avatar-container" :src="teacherData.avatarurl" v-if="teacherData.avatarurl" :mode="'aspectFill'">
          </div>
          <!-- <hoo-score :score="teacherData.star" :type="'show'" :size="'small'"></hoo-score> -->
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
              <hoo-have-icon-btn :type="teacherData.favored === 0 ? 'collection' : 'collection_already'" :id="teacherData.id" :favoid="teacherData.favorid" :subject="'teacher'" @changeData="saveCollection"></hoo-have-icon-btn>
            </div>
            <hoo-have-icon-btn :type="'share'"></hoo-have-icon-btn>
          </div>
        </div>
      </div>
      <hoo-nav :tabs="navData" :unOnShowDefault="'true'"  @tapNavItem="chooseNav"></hoo-nav>
      <div class="tearcher-detail-body">
        <div class="tearcher-detail-course" v-if="chooseNavNumber === '0' && courseData">
          <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
            <course-list :params="courseData"></course-list>
          </scroll-view>
        </div>
        <div class="teacher-detail-text" v-if="chooseNavNumber === '1'">
          <teacher-introduction :params="teacherData"></teacher-introduction>
        </div>
        <div class="teacher-detail-appraise" v-if="chooseNavNumber === '2'">
          <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
            <appra-list :params="appra.appraListData"></appra-list>
          </scroll-view>
        </div>
      </div>
    <link-home v-if="isShare"></link-home>
  </div>
</template>
<script>
  import {SubjectsFilterData, GetDataObjUseId} from '@/utils/default.data';
  import Utils from '@/utils/index';
  import hooLabel from '@/components/label';
  import hooAvatar from '@/components/avatar';
  import hooScore from '@/components/score';
  import hooHaveIconBtn from '@/components/have.icon.btn';
  import hooNav from '@/components/nav';
  import hooAuth from '@/components/auth';
  import linkHome from '@/components/linkhome';
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
      linkHome,
      appraList,
      courseList,
      teacherIntroduction
    },
    data () {
      return {
        teacherLabelTypeText: null,
        teacherLabelArr: null,
        navData: [{text: '课程'}, {text: '老师介绍'}, {text: '评价'}],
        chooseNavNumber: '0',
        teacherData: null,
        courseData: null,
        course: {
          limit: 15,
          offset: 0,
          total: 0
        },
        appra: {
          appraListData: null,
          limit: 15,
          offset: 0,
          total: 0
        },
        isShare: false
      };
    },
    onShow () {
      console.log('页面参数', this.$route.query);
      if (this.$route.query.isshare === '1') {
        this.isShare = true;
      }
    },
    mounted () {
      this.$wxUtils.setNavTitle('老师详情');
      this.getTeacherDetail();
    },
    methods: {
      saveCollection (e) {
        if (e.collect === 'collection_already') {
          this.teacherData.favored = 1;
        } else {
          this.teacherData.favored = 0;
        }
      },

      chooseNav (e) {
        this.chooseNavNumber = e;

        if (e === '2' && !this.appra.appraListData) {
          this.getTeacherAppraList();
        }
      },

      getTeacherDetail () {
        this.$network.teacher.getTeacherDetail({}, null, 'weapp/teacher/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.teacherData = res.data;
          this.teacherLabelTypeText = [];
          res.data.subjectslist.forEach((item, index) => {
            let result = GetDataObjUseId(SubjectsFilterData, item, 'tag');
            this.teacherLabelTypeText.push(result.desc);
          });

          // this.teacherLabelTypeText = res.data.subjectslist;
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
        this.$wxUtils.loading({title: '加载中...'});
        this.$network.search.searchCourse(requestParams).then(res => {
          this.$wxUtils.loading({show: false});
          if (!this.courseData) {
            this.courseData = [];
          }

          let result = Utils.filterRepeatData(this.courseData, res.data);
          this.courseData = this.courseData.concat(result);
          this.course.total = res.total;
        }).catch(err => {
          console.log(err);
        });
      },

      getTeacherAppraList () {
        let requestParams = {
          limit: this.appra.limit,
          offset: this.appra.offset
        };

        this.$wxUtils.loading({title: '加载中...'});
        this.$network.base.getCommentList(requestParams, null, 'weapp/comments/institution/' + this.$route.query.id).then(res => {
          // console.log('获取评价数据', res);
          this.$wxUtils.loading({show: false});
          if (!this.appra.appraListData) {
            this.appra.appraListData = [];
          }
          let result = Utils.filterRepeatData(this.appra.appraListData, res.data);
          this.appra.appraListData = this.appra.appraListData.concat(result);
          this.appra.total = res.total;
        });
      },

      loadMore () {
        if (this.chooseNavNumber === '0') {
          if (this.course.total > this.course.offset + this.course.limit) {
            this.course.offset = this.course.offset + this.course.limit;
            this.getTeacherCourseList();
          }
        }

        if (this.chooseNavNumber === '2') {
          if (this.appra.total > this.appra.offset + this.appra.limit) {
            this.appra.offset = this.appra.offset + this.appra.limit;
            this.getTeacherAppraList();
          }
        }
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log(res.target);
        this.$network.base.recordShare({}, null, 'weapp/share/teacher/' + this.$route.query.id);
      }
      return {
        title: 'Hooray - ' + this.teacherData.name,
        path: '/pages/teacher.packages/teacher.detail?isshare=1&id=' + this.teacherData.id,
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
          text-align: center;

          .avatar-container {
            width: 200rpx;
            height: 200rpx;
            border-radius: 16rpx;
          }
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

    .tearcher-detail-body scroll-view{
      max-height: calc(100vh - 110rpx);
    }
  }
</style>
