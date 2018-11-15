<template>
  <div class="organi-detail-container" >
    <div class="organi-header" v-if="organiData.id">
      <div class="organi-header-item organi-avatar-body">
        <div class="organi-avatar">
          <hoo-avatar :avatar="organiData.coverfile"></hoo-avatar>
        </div>
        <div class="organi-avatar-right">
          <div class="organi-header-title">{{organiData.name}}</div>
          <hoo-auth v-if="organiData.endorsed"></hoo-auth>
        </div>
      </div>

      <div class="organi-header-item organi-header-inf">
        <div class="organi-inf-item" @click="callPhone">
          <div class="organi-inf-label phone"></div>
          <div class="organi-inf-text">{{organiData.phone}}</div>
        </div>
        <div class="organi-inf-item" @click="openGuideMap">
          <div class="organi-inf-label position"></div>
          <div class="organi-inf-text">{{organiData.address}}</div>
        </div>
      </div>

      <div class="organi-header-content">
        <div class="organi-header-text" :class="showAllBriefStatu?'':'line-clamp-3'" @click="showAllBrief">{{organiData.brief}}</div>
        <div class="organi-header-ctrl">
          <div class="organi-header-ctrl-item">
            <hoo-have-icon-btn :type="organiData.favored === 0 ? 'collection' : 'collection_already'" :id="organiData.id" :favoid="organiData.favorid" :subject="'institution'" @changeData="saveCollection"></hoo-have-icon-btn>
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
        <!-- <organi-desc v-if="chooseNavNumber === '3'" :params="organiData"></organi-desc> -->
      </div>
    </div>
  </div>
</template>
<script>
  import Utils from '@/utils/index';
  import hooAvatar from '@/components/avatar';
  import hooHaveIconBtn from '@/components/have.icon.btn';
  import hooNav from '@/components/nav';
  import hooAuth from '@/components/auth';
  import courseList from '@/module/course/course.list';
  import teacherList from '@/module/teacher/teacher.list';
  import appraisalList from '@/module/base/appraisal/appraisal.list';
  // import organiDesc from '@/module/organization/organization.desc';

  export default {
    components: {
      hooAvatar,
      hooHaveIconBtn,
      hooNav,
      hooAuth,
      courseList,
      teacherList,
      appraisalList
      // organiDesc
    },
    data () {
      return {
        showAllBriefStatu: false,
        navData: ['课程', '老师', '评价'],
        chooseNavNumber: '0',
        organiData: {},
        courseData: null,
        teacherData: null,
        location: this.$storage.get(this.$storageTypeName['location']),
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
            limit: 15,
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
      saveCollection (e) {
        if (e.collect === 'collection_already') {
          this.organiData.favored = 1;
        } else {
          this.organiData.favored = 0;
        }
      },

      showAllBrief () {
        this.showAllBriefStatu = !this.showAllBriefStatu;
      },

      callPhone () {
        this.$wxUtils.callPhone({phone: this.organiData.phone});
      },

      openGuideMap () {
        if (this.organiData.xlat && this.organiData.xlng) {
          let params = {
            slat: this.location.latitude,
            slng: this.location.longitude,
            elat: this.organiData.xlat,
            elng: this.organiData.xlng,
            ename: this.organiData.address
          };

          this.$router.push({path: '/pages/guideMap/index', query: {obj: encodeURIComponent(JSON.stringify(params))}});
        }
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
        this.$wxUtils.loading({title: '加载中...'});
        this.$network.search.searchCourse(requestParams).then(res => {
          // console.log('返回查找课程数据', res);
          this.$wxUtils.loading({show: false});
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
        this.$wxUtils.loading({title: '加载中...'});
        this.$network.search.searchTearch(requestParams).then(res => {
          // console.log('返回查找老师数据', res);
          this.$wxUtils.loading({show: false});
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
        this.$wxUtils.loading({title: '加载中...'});
        this.$network.base.getCommentList(requestParams, null, 'weapp/comments/institution/' + this.$route.query.id).then(res => {
          // console.log('获取评价数据', res);
          this.$wxUtils.loading({show: false});
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
        // console.log(res.target);
        this.$network.base.recordShare({}, null, 'weapp/share/institution/' + this.$route.query.id);
      }
      return {
        title: 'Hooray - ' + this.organiData.name,
        path: '/pages/organization.packages/organi.detail?id=' + this.organiData.id,
        imageUrl: this.organiData.coverfile
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .organi-detail-container {
    .organi-header {
      padding: 40rpx;

      .organi-header-item {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #efefef;
      }

      .organi-avatar-body {
        @include flex(flex-start, center);
        .organi-avatar {
          flex-shrink: 0;
          margin-right: 30rpx;
        }

        .organi-header-title {
          font-size: 18px;
          font-weight: bold;
        }
      }

      .organi-header-inf {
        .organi-inf-item {
          margin-top: 20rpx;
          @include flex(flex-start, center);
          &:first-child {
            margin-top: 0;
          }

          .position {
            @include backgroundImg('../../assets/images/ic_location@3x.png');
          }

          .phone {
            @include backgroundImg('../../assets/images/ic_t_phone@3x.png');
          }

          .organi-inf-label {
            display: inline-block;
            width: 56rpx;
            height: 56rpx;
            flex-shrink: 0;
            margin-right: 20rpx;
          }

          .organi-inf-text {

          }
        }
      }

      .organi-header-content {
        margin-top: 30rpx;

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
