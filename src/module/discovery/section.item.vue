<template>
  <div class="section-container" @click="goDetail">
    <div class="section-title">
      <div class="section-avatar" :style="'background: url(' + sectionData.avatar + ') no-repeat 50% 50%; background-size: cover;'"></div>
      <div class="section-inf">
        <div class="section-inf-title line-clamp-2">{{sectionData.title}}</div>
        <!-- <div class="section-inf-desc">{{sectionData.desc}}</div> -->
      </div>
    </div>
    <div class="section-label">
      <hoo-label :type-text="sectionData.label_type" :label-arr="sectionData.label_arr"></hoo-label>
      <div class="section-distance" v-if="sectionData.distance">{{sectionData.distance}}km</div>
    </div>
    <div class="section-cover" :mode="asceptFill" :style="'background: url(' + sectionData.cover + ') no-repeat 50% 50%; background-size: cover;'"></div>
    <div class="section-desc">{{sectionData.desc}}</div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import hooLabel from '@/components/label';

  export default {
    props: ['sectionData'],
    components: {
      hooLabel
    },
    data () {
      return {
      };
    },
    mounted () {
      this.$store.commit(MutationsType.SET_CHOOSE_ACTIVITY, this.sectionData);
    },
    methods: {
      goDetail () {
        this.$router.push('/pages/index/section.detail');
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
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start;

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
