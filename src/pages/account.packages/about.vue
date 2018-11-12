<template>
  <div class="about-container">
    <div class="about-image">
      <image :src="'/img/logo_2.png'" :mode="'aspectFit'" />
    </div>
    <div class="about-item">
      <div class="about-desc" :class="clamp?'line-clamp-3':''" @click="clampStatu">
        这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray
        的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍
        这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray
        的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍
        这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray
        的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍
      </div>
    </div>
    <div class="about-item about-inf">
      <div class="about-inf-item" @click="callphone">
        <span class="about-item-icon telephone"></span>
        <span class="about-item-text">010-12345678</span>
      </div>
      <div class="about-inf-item" @click="callphone">
        <span class="about-item-icon phone"></span>
        <span class="about-item-text">+86 132 3333 2222</span>
      </div>
      <div class="about-inf-item" @click="copyEmail">
        <span class="about-item-icon email"></span>
        <span class="about-item-text">hooray@163.com</span>
      </div>
      <div class="about-inf-item ">
        <span class="about-item-icon website"></span>
        <span class="about-item-text about-website-text">联系邮箱</span>
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
      clamp: true,
      navData: ['使用说明', '合同条款'],
      chooseNavNumber: '0',
      instruction: '使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍使用说明这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍',
      htmlabout: '合同条款这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍这是关于hooray的一些介绍'
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('关于HOORAY');
    this.$network.base.getCompanyDetail().done((res) => {
      console.log(res);
    });
  },
  methods: {
    chooseNav (e) {
      this.chooseNavNumber = e;
    },

    clampStatu () {
      this.clamp = !this.clamp;
    },

    callphone () {
      this.$wxUtils.callPhone({phone: '000'});
    },

    copyEmail () {
      this.$wxUtils.setClipboardData('hooray@163.com', '邮箱复制成功!');
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
        height: 10vh;
      }
    }

    .about-inf {
      .about-inf-item {
        margin-top: 30rpx;
        @include flex(flex-start, center);

        .about-item-icon {
          width: 56rpx;
          height: 56rpx;
          margin-right: 20rpx;
          flex-shrink: 0;
          display: inline-block;
        }

        .phone {
          @include backgroundImg('../../assets/images/ic_m_phone@3x.png');
        }

        .email {
          @include backgroundImg('../../assets/images/ic_mail@3x.png');
        }

        .telephone {
          @include backgroundImg('../../assets/images/ic_t_phone@3x.png');
        }

        .website {
          @include backgroundImg('../../assets/images/ic_website@3x.png');

        }

        .about-website-text {
          text-decoration: underline;
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
