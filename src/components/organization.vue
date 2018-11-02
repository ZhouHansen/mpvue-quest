<template>
  <div class="organi-container" v-if="params">
    <div class="organi-inf" @click="visitOrganiDetail">
      <div class="organi-avatar" :style="'background: url(' + params.coverfile + ') no-repeat 50% 50%; background-size: cover;'"></div>
      <div class="organi-title">
        <div class="organi-title-text ellipsis">{{params.name}}</div>
        <div class="organi-title-auth">
          <div class="organi-title-auth-icon"></div>
          <div class="organi-title-auth-text">Hooray认证</div>
        </div>
      </div>
    </div>
    <div class="organi-btn" @click="callPhone">
      <div class="organi-btn-icon phone"></div>
      <div class="organi-btn-text">电话咨询</div>
    </div>
  </div>
</template>
<script>
  import WxUtils from '@/utils/wx.utils';

  export default {
    props: ['organiData'],
    data () {
      return {
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
        if (this.params.phone) {
          WxUtils.callPhone({phone: this.params.phone});
        } else {
          this.$wxUtils.toast({title: '机构为设置电话'});
        }
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
    @include flex(space-between);

    .organi-inf {
      flex-basis: 100%;

      @include flex(flex-start);
      .organi-avatar {
        flex-shrink: 0;
        width: 88rpx;
        height: 88rpx;
        border-radius: 16rpx;
        border: 1rpx solid #f0f0f0;
        margin-right: 24rpx;
      }

      .organi-title {
        .organi-title-text {
          max-width: 50vw;
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
    .organi-btn {
      flex-shrink: 0;
      border-left: 1rpx solid #ececec;
      padding-left: 28rpx;
      @include flex(center, center, column nowrap);

      .organi-btn-icon {
        display: inline-block;
        width: 58rpx;
        height: 58rpx;
      }

      .phone {
        @include backgroundImg('../assets/images/telephone.png');
      }

      .organi-btn-text {
        font-size: 12px;
        margin-top: 8rpx;
      }
    }
  }
</style>
