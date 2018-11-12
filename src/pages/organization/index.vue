<template>
  <div class="organization-container">
      <map v-if="initMap" id="map" :markers="markers"
        @markertap="markertap"
        @callouttap="markertap"
        @tap="tapMap"
        @regionchange="regionMap"
        @begin="regionMapBegin"
        @end="regionMapEnd"
        :scale="15"
        :show-location="'true'"
        :longitude="location.longitude"
        :latitude="location.latitude"
        :class="showRecommend?'unfill-height': 'fill-height'">
        <organi-filter-button :data="chooseFilterCity" @filterButton="tapFilterButton"></organi-filter-button>
        <!-- <organi-filter-button :data="chooseFilterType" @filterButton="tapFilterButton"></organi-filter-button> -->
        <organi-filter :type="filterType" :data="filter" @tapFilter="chooseFilter" v-if="showFilterList"></organi-filter>
        <cover-view class="show-recommend" v-if="!showRecommend" @click="toggleRecommend">
          <cover-view class="show-recommend-text">点击显示推荐机构</cover-view>
        </cover-view>
        <cover-view class="back-location" :class="showRecommend?'back-location-bottom-small':'back-location-bottom-big'" @click="backLocation">
          <cover-image :src="'../../img/location.png'"></cover-image>
        </cover-view>
      </map>
      <div class="" :class="showRecommend?'recommend-body':'hide-recommend'" v-if="showRecommend && initMap">
        <div class="recommend-ctrl" @click="toggleRecommend"><span></span></div>
        <recommend-organi :params="recommendData" :location="location"></recommend-organi>
      </div>
  </div>
</template>
<script>
import _ from 'lodash/core';
import Utils from '@/utils/index';
import {OrganiMapCityCenter, GetDataObjUseId} from '@/utils/default.data';
import {GetAddressUseLngLat} from '@/utils/location';
import recommendOrgani from '@/module/organization/recommend.organi';
import organiFilter from '@/module/organization/coverView/organi.filter';
import organiFilterButton from '@/module/organization/coverView/organi.filter.button';

let dragMapParam = null;

export default {
  components: {
    recommendOrgani,
    organiFilter,
    organiFilterButton
  },
  data () {
    return {
      localAddress: '',
      map: null,
      location: null,
      fixedPoint: null,
      address: null,
      searchMarkLnglat: {}, // 记录搜索机构的经纬度，用于计算拖动距离，大于searchMarkLimit才进行查找
      searchMarkLimit: 50000, // 单位 m
      initMap: false,
      showRecommend: true,
      recommendData: [],
      showFilterList: false,
      markers: null,
      markersData: [],
      filter: [],
      filterType: '',
      filterCity: OrganiMapCityCenter,
      chooseFilterCity: {},
      filterTypeData: [
        {id: 'all', type: 'type', text: '全部'},
        {id: 'course', type: 'type', text: '课程'},
        {id: 'activity', type: 'type', text: '活动'}
      ],
      chooseFilterType: {}
    };
  },
  onLoad () {
  },
  mounted () {
    this.$wxUtils.setNavTitle('机构');
    this.map = wx.createMapContext('map');

    this.chooseFilterType = this.filterTypeData[0];
  },
  onShow () {
    if (this.initMap) {
      return;
    }

    let result = this.$storage.get(this.$storageTypeName.address);

    if (!result) {
      this.$wxUtils.getLocation().then(res => {
        GetAddressUseLngLat(res, (res) => {
          result = res;
          this.init(result);
        });
      }).catch(() => {
        // 没有获取到权限，提示地图无法展示，跳转到设置页面
        this.$wxUtils.toast({title: '未获取到位置权限，请设置', dur: 3000});
        setTimeout(() => {
          this.$router.push('/pages/account.packages/setting');
        }, 2000);
      });
    } else {
      this.init(result);
    }
  },
  methods: {
    init (result) {
      this.address = result.result.ad_info.city.slice(0, -1);
      this.localAddress = this.address;

      this.filterCity.forEach((item, index) => {
        if (item.text.indexOf(this.address) > -1) {
          this.chooseFilterCity = item;
        }

        if (this.filterCity.length - 1 === index && !this.chooseFilterCity.id) {
          this.chooseFilterCity = item[0];
        }
      });

      this.getLnglat();
      this.getMapList();
      this.getRecommendList();
    },

    initLocation () {
      this.searchMarkLnglat = this.fixedPoint;
      this.location = this.fixedPoint;
      this.address = this.localAddress;
      this.getMapList();
      this.getRecommendList();
    },

    getLnglat () {
      this.$wxUtils.getLocation().then(res => {
        this.fixedPoint = res;
        this.location = res;
        this.searchMarkLnglat = res;
      });
    },

    tapMap () {
      this.showRecommend = false;
      this.showFilterList = false;
    },

    regionMap (e) {
      console.log(e);
    },

    regionMapBegin (e) {
      // console.log(e);
      if (dragMapParam !== null) {
        clearTimeout(dragMapParam);
        dragMapParam = null;
      }
    },

    regionMapEnd (e) {
      if (e.mp.causedBy === 'drag') {
        this.showFilterList = false;
        this.showRecommend = false;
      }

      dragMapParam = setTimeout(() => {
        this.getCityList();
        clearTimeout(dragMapParam);
        dragMapParam = null;
      }, 4000);
    },

    toggleRecommend () {
      this.showFilterList = false;
      this.showRecommend = !this.showRecommend;
    },

    getCityList () {
      this.judgeGetMarkerDataStatu().then(res => {
        if (res) {
          this.location = this.searchMarkLnglat;
          this.getMapList();
        }
      });
    },

    // 获取城市推荐机构
    getRecommendList () {
      this.$network.organi.getRecommendOrgani({city: this.address}).then(res => {
        // console.log(res.data);
        this.recommendData = res.data;
      });
    },

    // // 下载图片到微信临时文件，在显示到地图中
    // setMarkerIcon (data) {
    //   return new Promise((resolve, reject) => {
    //     this.$wxUtils.download({url: data.markerfile}).then(res => {
    //       // console.log(res);
    //       this.markersData.push({
    //         iconPath: res,
    //         id: data.id,
    //         latitude: data.xlat,
    //         longitude: data.xlng,
    //         width: 40,
    //         height: 40
    //       });
    //       resolve();
    //     }).then(res => {
    //       reject(res);
    //     });
    //   });
    // },

    getMapList () {
      // console.log('查找城市的机构', this.address);
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.organi.getFilterByMapCity({city: this.address}).then(res => {
        // console.log(res.data);
        // let promiseArr = [];
        // res.data.forEach((item, index) => {
        //   promiseArr[index] = this.setMarkerIcon(item);
        // });

        // Promise.all(promiseArr).finally(result => {
        //   this.initMap = true;
        //   this.markers = this.markersData;
        //   this.$wxUtils.loading({show: false});
        // });
        let arr = [];
        res.data.forEach((item, index) => {
          arr.push({
            iconPath: '/img/iconlocation.png',
            name: item.name.substr(0, 5),
            width: 30,
            height: 30,
            id: item.id,
            latitude: item.xlat,
            longitude: item.xlng,
            callout: {
              content: item.name.substr(0, 5),
              color: '#FFB62E',
              fontSize: 14,
              borderRadius: 4,
              bgColor: '#ffffff',
              padding: 4,
              display: 'ALWAYS',
              textAlign: 'center'
            }
          });

          if (res.data.length - 1 === index) {
            if (this.markersData.length > 0) {
              let result = Utils.filterRepeatData(this.markersData, arr);
              this.markersData = this.markersData.concat(result);
            } else {
              this.markersData = arr;
            }
            this.$wxUtils.loading({show: false});
            // console.log('显示mark', this.markersData);
            this.initMap = true;
            this.markers = this.markersData;
          }
        });
      });
    },

    tapFilterButton (e) {
      // console.log(e);
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
      // console.log('选择过滤条件', e);
      if (e.type === 'type') {
        this.chooseFilterType = e;
      } else {
        this.chooseFilterCity = e;
        this.address = this.chooseFilterCity.id;
      }
      this.$wxUtils.loading({title: '查找中...'});
      this.showFilterList = false;
      this.markers = null;
      this.$wxUtils.loading({show: false});

      this.setMapCenterAndSearchDataList();
    },

    setMapCenterAndSearchDataList () {
      let result = GetDataObjUseId(OrganiMapCityCenter, this.address);

      this.location = {
        longitude: result.lng,
        latitude: result.lat
      };
      this.getMapList();
      this.getRecommendList();
    },

    markertap (e) {
      // console.log(e);
      let id = e.mp.markerId;
      let result = _.find(this.markers, (object) => {
        return object.id === id;
      });

      // console.log(result); // 返回的结果是mark对象数据
      this.$router.push({path: '/pages/organization.packages/organi.detail', query: {id: result.id}});
    },

    judgeGetMarkerDataStatu () {
      return new Promise((resolve, reject) => {
        this.getCenterLnglat().then(res => {
          let distance = Utils.sumLocation({lat1: this.searchMarkLnglat.latitude, lng1: this.searchMarkLnglat.longitude, lat2: res.latitude, lng2: res.longitude});
          if (distance.s > this.searchMarkLimit) {
            this.searchMarkLnglat = res;
            resolve(true);
          } else {
            resolve(false);
          }
        }).then(res => {
          resolve(true); // 如果不能获取到地图中心点的经纬度，直接可以查找
        });
      });
    },

    backLocation () {
      this.map.moveToLocation();
      this.initLocation();
    },

    getCenterLnglat () {
      return new Promise((resolve, reject) => {
        this.map.getCenterLocation({
          success: res => {
            // console.log(res);
            let lnglatObj = {
              longitude: res.longitude,
              latitude: res.latitude
            };
            resolve(lnglatObj);
          },
          fail: res => {
            reject(res);
          }
        });
      });
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
      height: 55vh;
    }

    .fill-height {
      width: 100%;
      height: 100vh;
    }

    .recommend-body {
      height: 45vh;
      overflow: hidden;
    }

    .show-recommend {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      background-color: $topic-color;
      color: #ffffff;

      .show-recommend-text {
        margin: 24rpx 16rpx;
        text-align: center;
        font-size: 12px;
      }
    }

    .back-location {
      position: absolute;
      right: 20rpx;
      background-color: #ffffff;
      padding: 5rpx;
      border-radius: 100%;

      cover-image {
        width: 50rpx;
        height: 50rpx;
      }
    }

    .back-location-bottom-big {
      bottom: 90rpx;
    }

    .back-location-bottom-small {
      bottom: 20rpx;
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
