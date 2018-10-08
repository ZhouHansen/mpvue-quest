<template>
  <div class="teacher-detail-container">
      <div class="teacher-detail-header">
        <div class="detail-left">
          <div class="detail-left-avatar">
            <hoo-avatar :type="'big'"></hoo-avatar>
          </div>
          <hoo-score :score="2.5" :type="'show'" :size="'small'"></hoo-score>
        </div>
        <div class="detail-right">
          <div class="detail-right-name">
            <span class="detail-right-name-text">冯老师</span>
            <hoo-auth></hoo-auth>
          </div>
          <div class="detail-deucation">清华大学/经济学博士</div>
          <hoo-label :type-text="teacherLabelTypeText" :label-arr="teacherLabelArr"></hoo-label>
          <div class="detail-ctrl">
            <div class="collect-btn">
              <hoo-have-icon-btn :type="'collection'"></hoo-have-icon-btn>
            </div>
            <hoo-have-icon-btn :type="'share'"></hoo-have-icon-btn>
          </div>
        </div>
      </div>
      <hoo-nav :tabs="navData" @tapNavItem="chooseNav"></hoo-nav>
      <div class="tearcher-detail-course" v-if="chooseNavNumber === '0'">
        <teacher-introduction></teacher-introduction>
      </div>
      <div class="teacher-detail-text" v-if="chooseNavNumber === '1'">
        <course-list></course-list>
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
        teacherLabelTypeText: '数学',
        teacherLabelArr: ['蜗牛英语'],
        navData: ['课程', '老师介绍', '评价'],
        chooseNavNumber: '0'
      };
    },
    onShow () {
      this.chooseNavNumber = '0';
    },
    mounted () {
      this.$wxUtils.setNavTitle('老师详情');
    },
    methods: {
      chooseNav (e) {
        this.chooseNavNumber = e;
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '老师详情',
        path: '/page/user?id=123'
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
