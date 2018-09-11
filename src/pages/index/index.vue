<template>
  <div class="front-container">
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <label class="weui-search-bar__label" @click="goSearchPage">
          <div class="search-label-body flex-row-center">
            <span class="search-icon"></span>
            <div class="weui-search-bar__text ellipsis input-placeholder">搜索课程、活动、老师、学校</div>
          </div>
        </label>
      </div>
    </div>

    <div class="section-list">
      <div class="section-item" v-for="item in sections" :key="item.id">
        <hoo-section :section-data="item"></hoo-section>
      </div>
    </div>
  </div>
</template>

<script>
import WxUtils from '@/utils/wx.utils';
import hooSection from '@/module/discovery/section.item';

export default {
  components: {
    hooSection
  },
  data () {
    return {
      sections: null
    };
  },
  created () {
  },
  onReady () {
    // 调用应用实例的方法获取全局数据
    WxUtils.getUserInfo();
    console.log(this.$store.state);
    this.getDiscovery();
  },
  mounted () {
  },
  methods: {
    goSearchPage () {
      this.$router.push('/pages/search/index');
    },

    getDiscovery () {
      this.$network.discovery.getDiscovery({limit: 1, offset: 2}).then(res => {
        console.log(res);
        this.sections = res;
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables.scss';

  .front-container {
    width: 100%;
    min-height: 100vh;
    border-top: $navigateTitleBottomBorder;

    .weui-search-bar {
      background-color: #ffffff;
      border: 0;
      padding: 16rpx 5%;

      .weui-search-bar__form {
        border: 0;
        border-radius: 50rpx;
        overflow: hidden;

        .weui-search-bar__label {
          position: inherit;

          .search-icon {
            display: inline-block;
            width: 28rpx;
            height: 28rpx;
            vertical-align: middle;
            @include backgroundImg('../../assets/images/ic_search.png');
            margin-right: 10rpx;
          }

          .search-label-body {
            padding:10rpx 0;
            background-color: #f9f9f9;
          }
        }
      }
    }

  }
</style>
