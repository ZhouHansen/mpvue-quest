<template>
  <div class="appraisal-container">
    <div class="appra-avatar">
      <hoo-avatar></hoo-avatar>
    </div>
    <div class="appra-content">
      <div class="appra-title">
        <span class="appra-name">张晓</span>
        <span class="appra-date">9月2日</span>
      </div>
      <hoo-score :type="'show'" :score="4.2"></hoo-score>
      <div class="appra-img-list">
        <div class="appra-img-item" :style="'background: url(' + cover + ') no-repeat 50% 50%; background-size: cover;'"></div>
        <div class="appra-img-item" :style="'background: url(' + cover + ') no-repeat 50% 50%; background-size: cover;'"></div>
        <div class="appra-img-item" :style="'background: url(' + cover + ') no-repeat 50% 50%; background-size: cover;'"></div>
      </div>
      <div class="appra-desc">重视对学生活动过程的评价，注重评价学生在重视对学生活动过程的评价，注重评价学生在重视对学生活动过程的评价，注重评价学生在</div>
    </div>
  </div>
</template>
<script>
  import hooAvatar from '@/components/avatar';
  import hooScore from '@/components/score';

  export default {
    props: [''],
    components: {
      hooAvatar,
      hooScore
    },
    data () {
      return {
        cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_170849.403868.png'
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .appraisal-container {
    padding: 40rpx;
    border-top: 1rpx solid #dddddd;
    @include flex(flex-start, flex-start);

    .appra-avatar {
      flex-shrink: 0;
      margin-right: 24rpx;
    }

    .appra-content {
      .appra-title {
        @include flex(space-between);

        .appra-name {

        }

        .appra-date {
          font-size: 13px;
          color: #9f9f9f;
        }
      }

      .appra-img-list {
        @include flex(space-between);
        margin-top: 20rpx;

        .appra-img-item {
          width:23vw;
          height:23vw;
        }
      }

      .appra-desc {
        margin-top: 30rpx;
      }
    }
  }
</style>
