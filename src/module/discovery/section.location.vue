<template>
  <div class="location-container">
    <div class="location-inf">
      <div class="location-title">
        <span class="location-icon"></span>
        <span class="location-text line-clamp-2">北京市朝阳区望京soho231</span>
      </div>
      <div class="location-distance">231m</div>
    </div>
    <div class="location-ctrl">
      <image :src="'/img/direction.png'" :mode="asceptFill" />
    </div>
  </div>
</template>
<script>
export default {
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
          background: url('../../assets/images/locate.png') no-repeat 50% 50%;
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
