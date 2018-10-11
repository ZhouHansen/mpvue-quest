<template>
  <div class="organi-detail-container">
    <div class="organi-header">
      <div class="organi-avatar">
        <hoo-avatar :avatar="organiData.coverfile2"></hoo-avatar>
      </div>
      <div class="organi-header-content">
        <div class="organi-header-title">{{organiData.name}}</div>
        <div class="organi-header-text line-clamp-3 ">{{organiData.brief}}</div>
        <div class="organi-header-ctrl">
          <div class="organi-header-ctrl-item">
            <hoo-have-icon-btn :type="'collection'"></hoo-have-icon-btn>
          </div>
          <hoo-have-icon-btn :type="'share'"></hoo-have-icon-btn>
        </div>
      </div>
    </div>

    <div class="organi-content">
      <hoo-nav :tabs="navData" @tapNavItem="chooseNav"></hoo-nav>
      <div class="organi-nav-inf">
        <course-list v-if="chooseNavNumber === '0'"></course-list>
        <teacher-list v-if="chooseNavNumber === '1'"></teacher-list>
        <appraisal-list v-if="chooseNavNumber === '2'"></appraisal-list>
        <organi-desc v-if="chooseNavNumber === '3'" :params="organiData"></organi-desc>
      </div>
    </div>
  </div>
</template>
<script>
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
        navData: ['课程', '老师', '评价', '关于机构'],
        chooseNavNumber: '0',
        organiData: {}
      };
    },
    onShow () {
      this.chooseNavNumber = '0';
    },
    mounted () {
      this.getOrganiDetail();
    },
    methods: {
      chooseNav (e) {
        this.chooseNavNumber = e;
      },

      getOrganiDetail () {
        this.$network.organi.getOrganiDetail({}, null, 'weapp/inst/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.organiData = res.data;
        });
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '娱乐完教育机构详情...',
        path: '/pages/organization.packages/organi.detail?id=123'
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
    }
  }
</style>
