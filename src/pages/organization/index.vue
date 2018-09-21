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
      <map v-if="markers" :markers="markers" @markertap="markertap" :show-location="'true'" :longitude="'121.541557'" :latitude="'38.860103'" :style="'width: 100%; height: 100vh;'">
        <organi-filter-button :data="{type: 'city', text: '大连'}" @filterButton="tapFilterButton"></organi-filter-button>
        <organi-filter-button :data="{type: 'type', text: '全部'}" @filterButton="tapFilterButton"></organi-filter-button>
        <organi-filter :data="{type: 'city'}" @tapFilter="chooseFilter" v-if="showFilterList"></organi-filter>
        <recommend-organi></recommend-organi>
      </map>
  </div>
</template>
<script>
import _ from 'lodash';
import WxUtils from '@/utils/wx.utils';
import recommendOrgani from '@/module/organization/coverView/recommend.organi';
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
      url: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'
    };
  },
  mounted () {
    this.setMarkerIcon();
    this.getCityList();
  },
  methods: {
    setMarkerIcon () {
      WxUtils.download({url: this.url}).then(res => {
        this.markersData[0].iconPath = res;
        this.markers = this.markersData;
      });
    },

    getCityList () {

    },

    tapFilterButton (e) {
      this.showFilterList = !this.showFilterList;
    },

    chooseFilter (e) {
      console.log(e);
      this.showFilterList = false;
      this.markers = null;
      WxUtils.loading({title: '查找中...'});
      WxUtils.download({url: this.url}).then(res => {
        setTimeout(() => {
          WxUtils.loading({show: false});
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
    color: $topic-color;
  }
</style>
