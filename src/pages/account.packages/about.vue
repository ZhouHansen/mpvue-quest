<template>
  <div class="about-container">
    <div class="about-image">
      <image :src="'/img/logo_2.png'" :mode="'aspectFit'" />
    </div>
    <div class="about-item" v-if="about && about.about">
      <div class="about-desc" :class="clamp?'line-clamp-3':''" @click="clampStatu">
        {{about.about}}
      </div>
    </div>
    <div class="about-item about-inf" v-if="about">
      <div class="about-inf-item" @click="callphone(about.phone)" v-if="about.phone">
        <span class="about-item-icon telephone"></span>
        <span class="about-item-text">{{about.phone}}</span>
      </div>
      <div class="about-inf-item" @click="callphone(about.cell)" v-if="about.cell">
        <span class="about-item-icon phone"></span>
        <span class="about-item-text">{{about.cell}}</span>
      </div>
      <div class="about-inf-item" @click="copyEmail" v-if="about.email">
        <span class="about-item-icon email"></span>
        <span class="about-item-text">{{about.email}}</span>
      </div>
      <div class="about-inf-item" @click="copyWebsite" v-if="about.website">
        <span class="about-item-icon website"></span>
        <span class="about-item-text about-website-text">{{about.website}}</span>
      </div>
    </div>
    <div class="about-other" v-if="about">
      <hoo-nav :tabs="navData" :unborder="'true'"  @tapNavItem="chooseNav"></hoo-nav>
      <div class="about-instruction" v-if="chooseNavNumber === '0'">
        <wx-parse :content="about.introduction"></wx-parse>
      </div>
      <div class="about-contract" v-if="chooseNavNumber === '1'">
        <wx-parse :content="about.terms"></wx-parse>
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
      about: null,
      clamp: true,
      navData: ['使用说明', '合同条款'],
      chooseNavNumber: '0'
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('关于HOORAY');
    this.$network.base.getCompanyDetail().then((res) => {
      console.log(res);
      this.about = res.data;
    });
  },
  methods: {
    chooseNav (e) {
      this.chooseNavNumber = e;
    },

    clampStatu () {
      this.clamp = !this.clamp;
    },

    callphone (e) {
      this.$wxUtils.callPhone({phone: e});
    },

    copyEmail () {
      this.$wxUtils.setClipboardData(this.about.email, '邮箱复制成功!');
    },

    copyWebsite () {
      this.$wxUtils.setClipboardData(this.about.website, '网址复制成功!');
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
