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
      <map :markers="markers" :longitude="'121.541557'" :latitude="'38.860103'" :style="'width: 100%; height: 100vh;'"></map>
  </div>
</template>
<script>
export default {
  data () {
    return {
      markers: [
        {
          iconPath: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg',
          id: 1,
          latitude: '38.860103',
          longitude: '121.541557',
          width: 40,
          height: 40,
          label: {
            content: '你好'
          }
        }
      ]
    };
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .organization-container {
    color: $topic-color;
  }
</style>
