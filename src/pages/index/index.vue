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
  </div>
</template>

<script>
import * as MutationType from '@/store/mutation.type';
import WxUtils from '@/utils/wx.utils';

export default {
  components: {
  },
  data () {
    return {

    };
  },
  created () {
    // 调用应用实例的方法获取全局数据
    WxUtils.getUserInfo();
  },
  mounted () {
    this.Storage.set('aaa', '3toa');
    this.$store.commit(MutationType.SUM_TOTAL, 10);

    console.log(WxUtils.getPagesLength());
  },
  methods: {
    goSearchPage () {
      this.$router.push('/pages/search/index');
    },

    ajax () {
      this.$network.base.getUserInf({limit: 1, offset: 2}).then(res => {
        // console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },

    goCount () {
      this.$router.push('/pages/counter/index');
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
            background: url('../../assets/images/ic_search.png') no-repeat 50% 50%;
            background-size: contain;
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
