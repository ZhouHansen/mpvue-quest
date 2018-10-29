<template>
  <div>
    <div class="location-container" @click="openGuideMap">
      <div class="location-inf">
        <div class="location-title">
          <span class="location-icon"></span>
          <span class="location-text line-clamp-2">{{data.address}}</span>
        </div>
        <div class="location-distance">{{distanceToSection}}</div>
      </div>
      <div class="location-ctrl">
        <image :src="'/img/direction.png'" :mode="asceptFill" />
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/index';

export default {
  props: ['data', 'name'],
  data () {
    return {
      location: this.$storage.get(this.$storageTypeName['location']),
      routeInfo: null,
      distanceNum: 0
    };
  },
  computed: {
    distanceToSection () {
      if (this.data) {
        let result = Utils.backDistance({
          lat1: this.location.latitude,
          lng1: this.location.longitude,
          lat2: this.data.lat,
          lng2: this.data.lng
        });
        this.distanceNum = result.num;
        return result.text;
      } else {
        return false;
      }
    }
  },
  methods: {
    openGuideMap () {
      if (this.distanceNum > 50 * 1000) {
        this.$wxUtils.toast({title: '目的地太远啦～'});
        return;
      };

      let params = {
        slat: this.location.latitude,
        slng: this.location.longitude,
        elat: this.data.lat,
        elng: this.data.lng,
        ename: this.name
      };

      this.$router.push({path: '/pages/guideMap/index', query: {obj: JSON.stringify(params)}});
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .location-container {
    @include flex();

    .location-inf {

      .location-title {
        color: #000000;
        font-size: 16px;
        @include flex(flex-start, flex-start);

        .location-icon {
          display: inline-block;
          width: 36rpx;
          height: 36rpx;
          vertical-align: middle;
          margin-right: 10rpx;
          background: url('../../assets/images/direction.png') no-repeat 50% 50%;
          background-size: contain;
          flex-shrink: 0;
          margin-top:4rpx;
        }

        .location-text {
          vertical-align:middle;
        }
      }

      .location-distance {
        color: #9f9f9f;
        padding-left: 42rpx;
        margin-top: 10rpx;
      }
    }

    .location-ctrl {
      width: 72rpx;
      height: 72rpx;
      text-align: center;
      line-height: 88rpx;
      border: 1rpx dashed $topic-color;
      border-radius: 100%;
      flex-shrink: 0;
      image {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
</style>
