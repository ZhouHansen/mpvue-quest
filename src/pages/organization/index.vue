<template>
  <div class="organization-container">
    <!-- <map id="cabinetMap" wx:if="{{initMap}}"
     longitude="{{map.lngLat.longitude}}"
     latitude="{{map.lngLat.latitude}}"
     scale="14" controls="{{map.controls}}"
      bindcontroltap="controltap"
      markers="{{map.markers}}"
      bindmarkertap="markertap"
      bindregionchange="regionchange"
      show-location style="width: 100%; height:{{mapHeight}}px;"></map> -->
      <map v-if="markers" :markers="markers"
        @markertap="markertap"
        @tap="tapMap"
        @regionchange="regionMap"
        :show-location="'true'"
        :longitude="'121.541557'"
        :latitude="'38.860103'"
        :class="showRecommend?'unfill-height': 'fill-height'">
        <organi-filter-button :data="{type: 'city', text: '大连'}" @filterButton="tapFilterButton"></organi-filter-button>
        <organi-filter-button :data="{type: 'type', text: '全部'}" @filterButton="tapFilterButton"></organi-filter-button>
        <organi-filter :type="filterType" :data="filter" @tapFilter="chooseFilter" v-if="showFilterList"></organi-filter>
        <cover-view class="show-recommend" v-if="!showRecommend" @click="toggleRecommend">显示推荐机构</cover-view>
      </map>
      <div class="" :class="showRecommend?'recommend-body':'hide-recommend'" v-if="markers">
        <div class="recommend-ctrl" @click="toggleRecommend"><span></span></div>
        <recommend-organi v-if="showRecommend"></recommend-organi>
      </div>
  </div>
</template>
<script>
import _ from 'lodash';
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
      showRecommend: true,
      showFilterList: false,
      markers: null,
      markersData: [
        {
          iconPath: '',
          id: 1,
          latitude: '38.860103',
          longitude: '121.541557',
          width: 40,
          height: 40,
          label: {
            content: '那都是'
          }
        }
      ],
      filter: [],
      filterType: '',
      filterCity: [
        {id: 'asdh1', text: '大连'},
        {id: 'asdh2', text: '沈阳'},
        {id: 'asdh3', text: '鞍山'},
        {id: 'asdh4', text: '营口'},
        {id: 'asdh5', text: '朝阳'}
      ],
      filterTypeData: [
        {id: 'all', text: '全部'},
        {id: 'course', text: '课程'},
        {id: 'activity', text: '活动'}
      ],
      url: 'http://ofqz9brr6.bkt.clouddn.com/avatar.jpg'
    };
  },
  mounted () {
    this.setMarkerIcon();
    this.getCityList();
  },
  methods: {
    tapMap () {
      this.showRecommend = false;
      this.showFilterList = false;
    },

    regionMap (e) {
      console.log(e);
      this.showRecommend = false;
      this.showFilterList = false;
    },

    toggleRecommend () {
      this.showFilterList = false;
      this.showRecommend = !this.showRecommend;
    },

    setMarkerIcon () {
      this.$wxUtils.download({url: this.url}).then(res => {
        console.log(res);

        this.markersData[0].iconPath = res;
        this.markers = this.markersData;
      });
    },

    getCityList () {

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
      console.log(e);
      this.showFilterList = false;
      this.markers = null;
      this.$wxUtils.loading({title: '查找中...'});
      this.$wxUtils.download({url: this.url}).then(res => {
        setTimeout(() => {
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
        }, 2000);
      });
    },

    markertap (e) {
      console.log(e);
      let id = e.mp.markerId;
      let result = _.find(this.markers, (object) => {
        return object.id === id;
      });

      console.log(result);
      this.$router.push({path: '/pages/organization.packages/organi.detail', query: {id: 1}});
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
      bottom: 30rpx;
      right: 10rpx;
      padding: 8rpx 10rpx;
      background-color: #ffffff;
      color: $topic-color;
      border-radius: 4px;
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
