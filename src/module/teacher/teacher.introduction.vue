<template>
  <div class="teacher-introduction-container">
    <div class="introduce-video" v-if="params.videourl">
      <hoo-have-left-border-title :title="'课程演示'"></hoo-have-left-border-title>
      <div class="video-content">
        <video :src="params.videourl" :objectFit="'contain'">
        </video>
      </div>
    </div>
    <div class="insert"></div>
    <div class="introduce-base">
      <hoo-have-left-border-title :title="'基本信息'"></hoo-have-left-border-title>
      <div class="introduce-base-list">
        <div class="introduce-base-item">
          <div class="introduce-base-title">姓名</div>
          <div class="introduce-base-text">{{params.name}}</div>
        </div>
        <div class="introduce-base-item" v-if="params.age">
          <div class="introduce-base-title">年龄</div>
          <div class="introduce-base-text">{{params.age}}</div>
        </div>
        <div class="introduce-base-item">
          <div class="introduce-base-title">地区</div>
          <div class="introduce-base-text">{{params.city}}</div>
        </div>
      </div>
    </div>
    <div class="insert" v-if="params.endorsed"></div>
    <div class="teacher-auth" v-if="params.endorsed">
      <hoo-have-left-border-title :title="'资历认证'"></hoo-have-left-border-title>
      <div class="auth-list">
        <div class="auth-item">
          <span class="auth-icon"></span>
          <span class="auth-text">{{params.endorsed}}</span>
        </div>
      </div>
    </div>
    <div class="insert"></div>
    <div class="teacher-desc">
      <hoo-have-left-border-title :title="'基本信息'"></hoo-have-left-border-title>
      <div class="teacher-desc-text">{{params.brief?params.brief:'还没有介绍'}}</div>
    </div>
    <div class="insert"></div>
    <div class="teacher-organization">
      <hoo-have-left-border-title :title="'所在机构'"></hoo-have-left-border-title>
      <div class="teacher-organization-content">
        <hoo-organization :organiData="params"></hoo-organization>
      </div>
    </div>
  </div>
</template>
<script>
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooOrganization from '@/components/organization';

export default {
  props: ['params'],
  components: {
    hooHaveLeftBorderTitle,
    hooOrganization
  },
  data () {
    return {
      // videoUrl: 'http://ofqz9brr6.bkt.clouddn.com/6421a883db3e42c7b50d762d94930d6b.mp4',
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
