<template>
  <div class="organi-container" v-if="params">
    <div class="organi-inf">
      <div class="organi-avatar" :style="'background: url(' + params.coverfile2 + ') no-repeat 50% 50%; background-size: cover;'"></div>
      <div class="organi-title">
        <div class="organi-title-text ellipsis">{{params.name}}</div>
        <div class="organi-title-auth">
          <div class="organi-title-auth-icon"></div>
          <div class="organi-title-auth-text">学了么认证</div>
        </div>
      </div>
    </div>
    <div class="organi-ctrl">
      <div class="organi-btn" @click="callPhone">
        <div class="organi-btn-icon phone"></div>
        <div class="organi-btn-text">电话咨询</div>
      </div>
       <div class="organi-btn" @click="visitOrganiDetail">
        <div class="organi-btn-icon detail"></div>
        <div class="organi-btn-text">查看机构</div>
      </div>
    </div>
  </div>
</template>
<script>
  import WxUtils from '@/utils/wx.utils';

  export default {
    props: ['organiData'],
    data () {
      return {
        avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg',
        params: null
      };
    },
    mounted () {
      this.getOrganiDetail();
    },
    methods: {
      getOrganiDetail () {
        this.$network.organi.getOrganiDetail({}, null, 'weapp/inst/' + this.organiData.instid).then(res => {
          console.log(res.data);
          this.params = res.data;
        });
      },

      callPhone () {
        WxUtils.callPhone({phone: '17645091513'});
      },

      visitOrganiDetail () {
        this.$router.push({path: '/pages/organization.packages/organi.detail', query: {id: this.params.id}});
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .organi-container {
    .organi-inf {
      @include flex(flex-start);
      .organi-avatar {
        width: 88rpx;
        height: 88rpx;
        border-radius: 16rpx;
        border: 1rpx solid #f0f0f0;
        margin-right: 24rpx;
      }

      .organi-title {
        .organi-title-text {
          font-size: 16px;
          color: #000000;
        }

        .organi-title-auth {
          @include flex(flex-start);

          .organi-title-auth-icon {
            display: inline-block;
            width: 28rpx;
            height: 28rpx;
            margin-right:6rpx;
            margin-top:-4rpx;
            @include backgroundImg('../assets/images/check-circle-fill.png');
          }

          .organi-title-auth-text {
            font-size: 12px;
            color: $topic-color;
          }
        }
      }
    }
    .organi-ctrl {
      $border-style: 1rpx solid #ececec;
      @include flex(space-between);
      padding-top: 20rpx;
      margin-top: 25rpx;
      border-top: $border-style;

      .organi-btn {
        width: 48%;
        border-right: $border-style;
        @include flex(center);

        &:last-child {
          border: 0;
        }

        .organi-btn-icon {
          display: inline-block;
          width: 46rpx;
          height: 46rpx;
          margin-right: 20rpx;
        }

        .phone {
          @include backgroundImg('../assets/images/telephone.png');
        }

        .detail {
          @include backgroundImg('../assets/images/detail.png');
        }
      }
    }

  }
</style>
