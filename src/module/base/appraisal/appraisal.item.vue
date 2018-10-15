<template>
  <div class="appraisal-container">
    <div class="appra-avatar">
      <hoo-avatar :avatar="paramsDetail.avatarfile"></hoo-avatar>
    </div>
    <div class="appra-content">
      <div class="appra-title">
        <span class="appra-name">张晓</span>
        <span class="appra-date">{{paramsDetail.pubat}}</span>
      </div>
      <hoo-score :type="'show'" :score="paramsDetail.extra.star"></hoo-score>
      <div class="appra-img-list" @click="previewImg">
        <div class="appra-img-item" v-for="(item, index) in paramsDetail.extra.images" :key="index" :style="'background: url(' + item + ') no-repeat 50% 50%; background-size: cover;'"></div>
      </div>
      <div class="appra-desc">{{paramsDetail.extra.content}}</div>
    </div>
  </div>
</template>
<script>
  import hooAvatar from '@/components/avatar';
  import hooScore from '@/components/score';

  export default {
    props: ['paramsDetail'],
    components: {
      hooAvatar,
      hooScore
    },
    mounted () {
      console.log(this.paramsDetail);
    },
    data () {
      return {
        cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_170849.403868.png'
      };
    },
    methods: {
      previewImg () {
        this.$wxUtils.previewImage({
          urls: [this.cover, this.cover, this.cover]
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .appraisal-container {
    padding: 40rpx;
    border-top: $searchItemTopBorder;
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
