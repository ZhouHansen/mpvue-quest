<template>
  <div class="recommend-organi-container">
    <div class="recommend-scroll">
      <scroll-view class="recommend-list" :scroll-y="'true'" :scroll-with-animation="'true'">
        <div class="title">推荐教育机构</div>
        <div class="recommend-item none" v-if="paramsResult.length === 0">暂无推荐</div>
        <div class="recommend-item" v-if="paramsResult.length > 0" v-for="(item, index) in paramsResult" :key="index" @click="visitOrgani(item.id)">
          <div class="recommend-avatar" :style="{background: 'url(' + item.coverfile + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
          <div class="recomment-item-body">
            <div class="recomment-name">{{item.name}}</div>
            <div class="recomment-inf">
              <div>
                <div class="auth" v-if="item.endorsed === 1">
                  <div class="auth-icon"></div>
                  <div class="auth-text">Hooray认证</div>
                </div>
              </div>
              <div class="distance" v-if="item.distance">{{item.distance}}</div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
  import Utils from '@/utils/index';

  export default {
    props: ['params', 'location'],
    data () {
      return {
      };
    },
    computed: {
      paramsResult () {
        this.params.forEach((item, index) => {
          if (item.xlng && item.xlat) {
            let result = Utils.backDistance({
              lat1: this.location.latitude,
              lng1: this.location.longitude,
              lat2: item.xlat,
              lng2: item.xlng
            });

            item['distanceNum'] = result.num;
            item['citySplit'] = item.city.split(',');
            if (item['citySplit'][2] && item['distanceNum'] < 50000) {
              item['distance'] = item['citySplit'][2] + ' ' + result.text;
            } else {
              item['distance'] = result.text;
            }
          }
        });

        this.params.sort((a, b) => {
          return a.distanceNum - b.distanceNum;
        });

        return this.params;
      }
    },
    methods: {
      visitOrgani (e) {
        // console.log(e);
        this.$router.push({path: '/pages/organization.packages/organi.detail', query: {id: e}});
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .recommend-organi-container {
    padding: 10rpx 0 40rpx 40rpx;
    background-color: #ffffff;
    width: calc(100vw - 80rpx);
    height: 45vh;

    .title {
      border-left: 8rpx solid $topic-color;
      padding-left: 20rpx;
      color: #000000;
      font-size: 16px;
    }

    .recommend-list {
      margin-top: 20rpx;
      width: 100%;
      max-height: 35vh;

      .recommend-item {
        display: inline-block;
        margin-top: 20rpx;
        margin-right: 10rpx;
        padding-bottom: 20rpx;
        border-bottom: 1rpx solid #d9d9d9;
        @include flex(space-between, center);

        &:last-child {
          border-bottom: 0;
        }

        .recommend-avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 16rpx;
          flex-shrink: 0;
          margin-right: 40rpx;
        }

        .recomment-item-body {
          width: 100%;

          .recomment-name {
            font-size: 16px;
            font-weight: bold;
            color: #000000;
          }

          .recomment-inf {
            @include flex(space-between, center);
            margin-top: 10rpx;

            .auth {
              @include flex(flex-start, center);

              .auth-icon {
                display: inline-block;
                width: 28rpx;
                height: 28rpx;
                margin-right:6rpx;
                margin-top:-4rpx;
                @include backgroundImg('../../assets/images/check-circle-fill.png');
              }

              .auth-text {
                color: $topic-color;
              }
            }

            .distance {
              padding: 0 10rpx;
              border-radius: 16rpx;
              background-color: #dcdcdc;
            }
          }
        }
      }

      .none {
        text-align: center;
        line-height: 25vw;
      }
    }
  }
</style>
