<template>
  <div class="about-container">
    <div class="about-image">
      <image :src="'/img/logo.png'" :mode="'aspectFit'" />
    </div>
    <div class="about-item">
      <div class="about-desc line-clamp-3">这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍</div>
    </div>
    <div class="about-item about-inf">
      <div class="about-inf-item">
        <span class="about-item-icon phone"></span>
        <span class="about-item-text">联系电话</span>
      </div>
      <div class="about-inf-item">
        <span class="about-item-icon email"></span>
        <span class="about-item-text">联系邮箱</span>
      </div>
    </div>
    <div class="about-other">
      <hoo-nav :tabs="navData" :unborder="'true'"  @tapNavItem="chooseNav"></hoo-nav>

      <div class="about-instruction" v-if="chooseNavNumber === '0'">
        <wx-parse :content="instruction"></wx-parse>
      </div>
      <div class="about-contract" v-if="chooseNavNumber === '1'">
        <wx-parse :content="htmlabout"></wx-parse>
      </div>
    </div>
  </div>
</template>
<script>
import hooNav from '@/components/nav';
import wxParse from 'mpvue-wxparse';

export default {
  components: {
    hooNav,
    wxParse
  },
  data () {
    return {
      navData: ['使用说明', '合同条款'],
      chooseNavNumber: '0',
      instruction: '使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍',
      htmlabout: '合同条款这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍'
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('关于Hooray');
  },
  methods: {
    chooseNav (e) {
      this.chooseNavNumber = e;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import '../../assets/style/variables.scss';

  .about-container {
    padding: 40rpx 0;
    min-height: calc(100vh - 80rpx);

    .about-item {
      margin: 0 40rpx;
      padding-bottom: 30rpx;
      border-bottom: 1rpx solid #efefef;
    }

    .about-image {
      padding: 40rpx 0;
      text-align:center;

      image {
        height: 18vh;
      }
    }

    .about-inf {
      .about-inf-item {
        margin-top: 30rpx;
        @include flex(flex-start, center);

        .about-item-icon {
          width: 36rpx;
          height: 36rpx;
          margin-right: 20rpx;
          flex-shrink: 0;
          display: inline-block;
        }

        .email {
          @include backgroundImg('../../assets/images/organi_position.png');
        }

        .phone {
          @include backgroundImg('../../assets/images/organi_phone.png');
        }
      }
    }

    .about-other {
      margin-top: 20rpx;

      .about-instruction,
      .about-contract {
        padding-top: 20rpx;
        margin: 0 40rpx;
        border-top: 1rpx solid #efefef;
      }
    }

  }
</style>
