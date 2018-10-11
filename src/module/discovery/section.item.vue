<template>
  <div class="section-container" @click="goDetail">
    <div class="section-title">
      <div class="section-avatar" :style="'background: url(' + sectionData.coverfile2 + ') no-repeat 50% 50%; background-size: cover;'"></div>
      <div class="section-inf">
        <div class="section-inf-title line-clamp-2">{{sectionData.name}}</div>
      </div>
    </div>
    <div class="section-label">
      <hoo-label :type-text="sectionData.subjectslist" :label-arr="sectionData.tagslist"></hoo-label>
      <div class="section-distance" v-if="distanceToSection">{{distanceToSection}}</div>
    </div>
    <div class="section-cover" :mode="asceptFill" :style="'background: url(' + sectionData.coverfile + ') no-repeat 50% 50%; background-size: cover;'"></div>
    <!-- <div class="section-desc">{{sectionData.organi}}</div> -->
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import hooLabel from '@/components/label';
  import Utils from '@/utils/index';

  export default {
    props: ['sectionData', 'location'],
    components: {
      hooLabel
    },
    data () {
      return {
      };
    },
    mounted () {
      // console.log('活动数据', this.sectionData);
    },
    computed: {
      distanceToSection () {
        if (this.sectionData.xlng && this.sectionData.xlat) {
          return Utils.backDistance({
            lat1: this.location.latitude,
            lng1: this.location.longitude,
            lat2: this.sectionData.xlat,
            lng2: this.sectionData.xlng
          });
        } else {
          return false;
        }
      }
    },
    methods: {
      goDetail () {
        this.$store.commit(MutationsType.SET_CHOOSE_ACTIVITY, this.sectionData);
        if (this.sectionData.ltype) {
          this.$router.push({path: '/pages/home/section.detail', query: {id: this.sectionData.id, type: 'lesson'}});
        } else {
          this.$router.push({path: '/pages/home/section.detail', query: {id: this.sectionData.id, type: 'product'}});
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .section-container {
    padding: 40rpx;
    border-top: 20rpx solid #f9f9f9;

    .section-title {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;

      .section-avatar {
        width: 88rpx;
        height: 88rpx;
        border-radius: 16rpx;
        flex-shrink: 0;
        margin-right:24rpx;
      }

      .section-inf {
        width: calc(100vw - 200rpx);

        .section-inf-title {
          font-size: 16px;
          color: #46311E;
        }

        .section-inf-desc {
          color: #9f9f9f;
        }
      }
    }

    .section-label {
      margin-top: 8rpx;
      @include flex(space-between, flex-end);

      .section-distance {
        flex-shrink: 0;
        padding: 2rpx 8rpx;
        font-size: 12px;
        background-color: #f2f2f2;
        margin-top: 10rpx;
        color: #9f9f9f;
        border-radius: 16rpx;
      }
    }

    .section-cover {
      margin-top: 20rpx;
      width: 100%;
      height: 45vw;
      border-radius: 20rpx;
    }

    .section-desc {
      color: #9f9f9f;
      margin-top:10rpx;
    }
  }
</style>
