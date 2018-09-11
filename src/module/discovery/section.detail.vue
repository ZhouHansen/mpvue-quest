<template>
  <!-- 课程，活动，商品 -->
  <div class="section-detail-container">
    <div class="section-cover" :style="'background: url(' + cover + ') no-repeat 50% 50%; background-size: cover;'"></div>
    <div class="section-title">
      <div class="section-title-text ellipsis">2018招牌通识营-在创造中原力觉醒</div>
      <hoo-label :type-text="labelTypeText" :label-arr="labelArr"></hoo-label>
      <div class="section-title-ctrl">
        <hoo-icon-button :type="'activity_already'" :person-num="'123'"></hoo-icon-button>
        <hoo-icon-button :type="'collection_already'"></hoo-icon-button>
        <hoo-icon-button :type="'share'"></hoo-icon-button>
      </div>
    </div>
    <div class="section-content">
      <left-border-title :title="'活动信息'"></left-border-title>
      <div class="section-content-arrange">
        <hoo-arrange></hoo-arrange>
      </div>
      <div class="section-content-location">
        <hoo-location></hoo-location>
      </div>
    </div>
    <div class="section-organi">
      <left-border-title :title="'机构信息'"></left-border-title>
      <div class="section-organi-content">
        <hoo-organi></hoo-organi>
      </div>
    </div>
    <div class="section-nav">
      <hoo-nav @tapNavItem="chooseNav" :tabs="tabData"></hoo-nav>

      <div class="section-nav-item">
        <div class="section-nav-detail" v-if="chooseNavIndex === '0'">
          详情
        </div>
        <div class="section-nav-appraisal" v-if="chooseNavIndex === '1'">评价</div>
      </div>

    </div>
  </div>
</template>
<script>
  import hooLabel from '@/components/label';
  import hooIconButton from '@/components/have.icon.btn';
  import leftBorderTitle from '@/components/left.border.title';
  import hooArrange from '@/components/arrange';
  import hooLocation from '@/module/discovery/section.location';
  import hooOrgani from '@/components/organization';
  import hooNav from '@/components/nav';

  export default {
    components: {
      hooLabel,
      hooIconButton,
      leftBorderTitle,
      hooArrange,
      hooLocation,
      hooOrgani,
      hooNav
    },
    data () {
      return {
        cover: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg',
        labelTypeText: '多动',
        labelArr: ['5-10岁', '109元'],
        tabData: ['详情', '评价'],
        chooseNavIndex: '0'
      };
    },
    methods: {
      chooseNav (e) {
        console.log('接收到点击的nav', e);
        this.chooseNavIndex = e;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .section-detail-container {
    width: 100%;
    min-height: 100vh;

    .section-cover {
      width: 100%;
      height: 25vh;
    }

    .section-title {
      margin: -100rpx 40rpx 0;
      background-color: #fff;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 20rpx #d4d4d4;
      padding: 40rpx;

      .section-title-text {
        font-size:18px;
        color: #46311e;
      }

      .section-title-ctrl {
        @include flex(space-around);
        margin-top: 20rpx;
      }
    }

    .section-content {
      padding: 40rpx;

      .section-content-arrange {
        margin-left: 20rpx;
        padding-bottom: 30rpx;
      }

      .section-content-location {
        margin-left: 20rpx;
        padding-top: 30rpx;
        border-top: 1rpx solid #efefef;
      }
    }

    .section-organi {
      border-top: 20rpx solid #f9f9f9;
      padding: 40rpx;

      .section-organi-content {
        margin-top: 30rpx;
      }
    }

    .section-nav {
      border-top: 20rpx solid #f9f9f9;
    }
  }
</style>
