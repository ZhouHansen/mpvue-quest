<template>
  <div class="teacher-introduction-container">
    <div class="introduce-video">
      <hoo-have-left-border-title :title="'课程演示'"></hoo-have-left-border-title>
      <div class="video-content">
        <video :src="'http://ofqz9brr6.bkt.clouddn.com/6421a883db3e42c7b50d762d94930d6b.mp4'" :objectFit="'contain'">
          <cover-view class="cover-view"></cover-view>
        </video>
      </div>
    </div>
    <div class="insert"></div>
    <div class="introduce-base">
      <hoo-have-left-border-title :title="'基本信息'"></hoo-have-left-border-title>
      <div class="introduce-base-list">
        <div class="introduce-base-item">
          <div class="introduce-base-title">姓名</div>
          <div class="introduce-base-text">冯仑</div>
        </div>
      </div>
    </div>
    <div class="insert"></div>
    <div class="teacher-auth">
      <hoo-have-left-border-title :title="'资历认证'"></hoo-have-left-border-title>
      <div class="auth-list">
        <div class="auth-item">
          <span class="auth-icon"></span>
          <span class="auth-text">教师资格证</span>
        </div>
      </div>
    </div>
    <div class="insert"></div>
    <div class="teacher-desc">
      <hoo-have-left-border-title :title="'基本信息'"></hoo-have-left-border-title>
      <div class="teacher-desc-text">
        教学经验丰富，专业知识扎实，授课体系清晰，善于学科之间联系及应用，深知学生所需，能够将内容前后联系，不断带领学生复习巩固，提倡边学边掌握，带领学生运用理解掌握法，深受学员信赖和喜爱。
      </div>
    </div>
    <div class="insert"></div>
    <div class="teacher-organization">
      <hoo-have-left-border-title :title="'基本信息'"></hoo-have-left-border-title>
      <div class="teacher-organization-content">
        <hoo-organization></hoo-organization>
      </div>
    </div>
  </div>
</template>
<script>
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooOrganization from '@/components/organization';

export default {
  props: ['data'],
  components: {
    hooHaveLeftBorderTitle,
    hooOrganization
  },
  data () {
    return {

    };
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .teacher-introduction-container {

    .insert {
      background-color: #f9f9f9;
      height: 20rpx;
      border-top: 1rpx solid #bfbfbf;
      border-bottom: 1rpx solid #bfbfbf;
    }

    .introduce-video {
      padding: 40rpx;
      border-top: 1rpx solid #bfbfbf;

      .video-content {
        margin-top: 30rpx;

        video {
          width: 100%;
          height: calc((100vw - 80rpx) / 2);
          border-radius: 16rpx;
        }

        .cover-view {
          width: 100%;
          height: 100%;
          border: 4rpx solid #ffffff;
          border-radius: 5rpx;
        }
      }
    }

    .introduce-base {
      padding: 40rpx;

      .introduce-base-list {
        margin-left: 20rpx;
        margin-top: 30rpx;

        .introduce-base-item {
          margin-bottom: 30rpx;
          font-size: 16px;
          @include flex(flex-start);

          .introduce-base-title {
            color: #bfbfbf;
            margin-right: 100rpx;
          }

          .introduce-base-text {
            color: #000000;
          }
        }
      }
    }

    .teacher-auth {
      padding: 40rpx;

      .auth-list {
        @include flex(flex-start, center, row wrap);
        margin-top: 30rpx;

        .auth-item {
          @include flex(flex-start);
          color: $topic-color;
          border-radius: 42rpx;
          padding: 8rpx 16rpx;
          border: 1rpx solid $topic-color;

          .auth-icon {
            @include backgroundImg('../../assets/images/big_right.png');
            width: 30rpx;
            height: 30rpx;
            display: inline-block;
            margin-right: 10rpx;
          }
        }
      }
    }

    .teacher-desc {
      padding: 40rpx;

      .teacher-desc-text {
        margin-top: 24rpx;
        margin-left: 20rpx;
        line-height: 28px;
      }
    }

    .teacher-organization {
      padding: 40rpx;

      .teacher-organization-content {
        margin-top: 30rpx;
      }
    }
  }
</style>
