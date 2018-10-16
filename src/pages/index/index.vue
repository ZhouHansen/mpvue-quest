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
        <hoo-section :section-data="item" :location="location"></hoo-section>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/utils/index';
import hooSection from '@/module/discovery/section.item';

export default {
  components: {
    hooSection
  },
  data () {
    return {
      sections: null,
      interval: null,
      location: null,
      limit: 15,
      offset: 0,
      total: 0
    };
  },
  created () {
  },
  mounted () {
    this.interval = setInterval(() => {
      this.getDashboardData();
      let obj = this.$storage.get(this.$storageTypeName.openid);
      if (obj && obj.openid) {
        clearInterval(this.interval);
      }
    }, 2000);

    this.$wxUtils.getLocation().then(res => {
      this.location = res;
    });
  },
  onShow () {
    if (!this.location) {
      this.location = this.$storage.get(this.$storageTypeName.location);
      // console.log(this.location);
    }
  },
  onPullDownRefresh () {
    this.offset = 0;
    this.sections = [];
    this.getDashboardData();
  },
  methods: {
    goSearchPage () {
      this.$router.push('/pages/search/index');
    },

    getDashboardData () {
      let requestParams = {
        limit: this.limit,
        offset: this.offset
      };

      this.$wxUtils.loading({title: '加载中...'});
      this.$network.discovery.getDashboard(requestParams).then(res => {
        console.log(res);
        if (res.e !== 0) {
          return;
        }
        this.$wxUtils.loading({show: false});
        this.sections = Utils.filterRepeatData(this.sections, res.data);
        this.total = res.total;
      }).catch(err => {
        console.log(err);
      });
    }
  },

  onReachBottom () {
    if (this.total > this.offset + this.limit) {
      this.offset = this.offset + this.limit;
      this.getDashboardData();
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
