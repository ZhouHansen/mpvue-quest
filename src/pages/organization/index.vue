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
      <map v-if="markers" :markers="markers" :show-location="'true'" :longitude="'121.541557'" :latitude="'38.860103'" :style="'width: 100%; height: 100vh;'">
        <recommend-organi></recommend-organi>
      </map>
  </div>
</template>
<script>
import WxUtils from '@/utils/wx.utils';
import recommendOrgani from '@/module/organization/coverView/recommend.organi';

export default {
  components: {
    recommendOrgani
  },
  data () {
    return {
      markers: null,
      markersData: [
        {
          iconPath: '',
          id: 1,
          latitude: '38.860103',
          longitude: '121.541557',
          width: 40,
          height: 40
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
