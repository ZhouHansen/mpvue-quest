<template>
  <div class="organization-container">
      <map v-if="initMap" :markers="markers"
        @markertap="markertap"
        @tap="tapMap"
        @regionchange="regionMap"
        @begin="regionMapBegin"
        @end="regionMapEnd"
        :scale="16"
        :show-location="'true'"
        :longitude="116.46"
        :latitude="39.92"
        :class="showRecommend?'unfill-height': 'fill-height'">
        <organi-filter-button :data="chooseFilterCity" @filterButton="tapFilterButton"></organi-filter-button>
        <organi-filter-button :data="chooseFilterType" @filterButton="tapFilterButton"></organi-filter-button>
        <organi-filter :type="filterType" :data="filter" @tapFilter="chooseFilter" v-if="showFilterList"></organi-filter>
        <cover-view class="show-recommend" v-if="!showRecommend" @click="toggleRecommend">
          <cover-view class="show-recommend-text">显示推荐机构</cover-view>
        </cover-view>
      </map>
      <div class="" :class="showRecommend?'recommend-body':'hide-recommend'" v-if="markers">
        <div class="recommend-ctrl" @click="toggleRecommend"><span></span></div>
        <recommend-organi v-if="showRecommend" :params="recommendData"></recommend-organi>
      </div>
  </div>
</template>
<script>
import _ from 'lodash/core';
import recommendOrgani from '@/module/organization/recommend.organi';
import organiFilter from '@/module/organization/coverView/organi.filter';
import organiFilterButton from '@/module/organization/coverView/organi.filter.button';

export default {
  components: {
    recommendOrgani,
    organiFilter,
    organiFilterButton
  },
  data () {
    return {
      latitude: '',
      longitude: '',
      initMap: false,
      showRecommend: true,
      recommendData: [],
      showFilterList: false,
      markers: null,
      markersData: [],
      filter: [],
      filterType: '',
      filterCity: [
        {id: 'asdh1', type: 'city', text: '大连'},
        {id: 'asdh2', type: 'city', text: '沈阳'},
        {id: 'asdh3', type: 'city', text: '鞍山'},
        {id: 'asdh4', type: 'city', text: '营口'},
        {id: 'asdh5', type: 'city', text: '朝阳'}
      ],
      chooseFilterCity: {},
      filterTypeData: [
        {id: 'all', type: 'type', text: '全部'},
        {id: 'course', type: 'type', text: '课程'},
        {id: 'activity', type: 'type', text: '活动'}
      ],
      chooseFilterType: {},
      dragMapParam: null
    };
  },
  mounted () {
    this.$wxUtils.loading({title: '加载中...'});
    this.chooseFilterCity = this.filterCity[0];
    this.chooseFilterType = this.filterTypeData[0];

    this.$wxUtils.getLocation().then(res => {
      this.latitude = res.latitude;
      this.longitude = res.longitude;
    });
    this.getCityList();
    this.getRecommendList();
  },
  onShow () {
    // this.getRecommendList();
  },
  methods: {
    tapMap () {
      this.showRecommend = false;
      this.showFilterList = false;
    },

    regionMap (e) {
      console.log(e);
    },

    regionMapBegin (e) {
      this.showFilterList = false;
      if (this.dragMapParam !== null) {
        clearTimeout(this.dragMapParam);
      }
    },

    regionMapEnd () {
      this.dragMapParam = setTimeout(() => {
        // console.log(e)
        this.getCityList();
      }, 2000);
    },

    toggleRecommend () {
      this.showFilterList = false;
      this.showRecommend = !this.showRecommend;
    },

    getCityList () {
      console.log('获取机构数据');
    },

    // 下载图片到微信临时文件，在显示到地图中
    setMarkerIcon (data) {
      return new Promise((resolve, reject) => {
        this.$wxUtils.download({url: data.markerfile}).then(res => {
          // console.log(res);
          this.markersData.push({
            iconPath: res,
            id: data.id,
            latitude: data.xlat,
            longitude: data.xlng,
            width: 40,
            height: 40
          });
          resolve();
        });
      });
    },

    getRecommendList () {
      this.$network.organi.getFilterByMapCity().then(res => {
        console.log(res.data);
        this.recommendData = res.data;

        let promiseArr = [];
        res.data.forEach((item, index) => {
          promiseArr[index] = this.setMarkerIcon(item);
        });

        Promise.all(promiseArr).then(result => {
          this.initMap = true;
          this.markers = this.markersData;
          this.$wxUtils.loading({show: false});
        });
      });
    },

    tapFilterButton (e) {
      this.showRecommend = false;
      if (this.filterType === e) {
        this.showFilterList = !this.showFilterList;
      } else {
        this.showFilterList = true;
      }

      this.filterType = e;

      if (e === 'city') {
        this.filter = this.filterCity;
      } else
      if (e === 'type') {
        this.filter = this.filterTypeData;
      }
    },

    chooseFilter (e) {
      // console.log(e);
      if (e.type === 'type') {
        this.chooseFilterType = e;
      } else {
        this.chooseFilterCity = e;
      }
      this.$wxUtils.loading({title: '查找中...'});
      this.$wxUtils.download({url: this.url}).then(res => {
        this.showFilterList = false;
        this.markers = null;
        this.$wxUtils.loading({show: false});
        this.markers = [{
          iconPath: res,
          id: 2,
          latitude: '38.865103',
          longitude: '121.541557',
          width: 40,
          height: 40
        },
        {
          iconPath: res,
          id: 3,
          latitude: '38.869103',
          longitude: '121.541557',
          width: 40,
          height: 40
        }
        ];
      });
    },

    markertap (e) {
      // console.log(e);
      let id = e.mp.markerId;
      let result = _.find(this.markers, (object) => {
        return object.id === id;
      });

      // console.log(result); // 返回的结果是mark对象数据
      this.$router.push({path: '/pages/organization.packages/organi.detail', query: {id: result.id}});
    }
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .organization-container {
    height: 100vh;
    overflow: hidden;

    .unfill-height {
      width: 100%;
      height: 65vh;
    }

    .fill-height {
      width: 100%;
      height: 100vh;
    }

    .recommend-body {
      height: 35vh;
      overflow: hidden;
    }

    .show-recommend {
      position: absolute;
      bottom: 10rpx;
      right: 10rpx;
      background-color: $topic-color;
      color: #ffffff;
      border-radius: 4px;

      .show-recommend-text {
        margin: 18rpx 16rpx;
      }
    }

    .recommend-ctrl {
      text-align: center;

      span {
        @include backgroundImg('../../assets/images/hide_ic.png');
        display: inline-block;
        width: 48rpx;
        height: 48rpx;
        animation: tips 5s infinite;
      }
    }

    @keyframes tips {
      0% {
        transform: translate3d(0, 0%, 0);
      }

      50% {
        transform: translate3d(0, 50%, 0);
      }

      100% {
        transform: translate3d(0, 0%, 0);
      }
    }
  }
</style>
