<template>
  <div class="section-container" @click="goDetail">
    <div class="section-title">
      <div class="section-title-left">
        <div class="section-avatar" :style="'background: url(' + sectionData.coverfile2 + ') no-repeat 50% 50%; background-size: cover;'"></div>
      </div>
      <div class="section-inf">
        <text class="section-inf-title line-clamp-2">{{sectionData.name}}</text>
      </div>
    </div>
    <div class="section-label">
      <div class="section-label-left">
        <div class="section-desc ellipsis" v-if="sectionData.instsname">{{sectionData.instsname}}</div>
        <hoo-label :type-text="sectionData.tags[0]" :label-arr="tagslist"></hoo-label>
      </div>
      <div class="section-distance" v-if="distanceToSection">{{distanceToSection}}</div>
    </div>
    <div class="section-cover" :mode="asceptFill" :style="'background: url(' + sectionData.coverfile + ') no-repeat 50% 50%; background-size: cover;'"></div>
  </div>
</template>
<script>
  import _ from 'lodash/core';
  import UniqWith from 'lodash/uniqWith';
  import {AgeFilterData, GetDataObjUseId} from '@/utils/default.data';
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
        let wxAddress = this.$storage.get(this.$storageTypeName.address);

        if (!this.sectionData.city) {
          return false;
        }

        if (wxAddress.result.address_component.city.indexOf(this.sectionData.city) > -1) {
          if (this.sectionData.xlng && this.sectionData.xlat) {
            let result = Utils.backDistance({
              lat1: this.location.latitude,
              lng1: this.location.longitude,
              lat2: this.sectionData.xlat,
              lng2: this.sectionData.xlng
            });

            return result.text;
          }
        } else {
          let cityArr = this.sectionData.city.split(',');
          let result = '';

          cityArr = UniqWith(cityArr, _.isEqual);

          cityArr.forEach((item, index) => {
            result = result + item;
          });

          return result;
        }
      },
      tagslist () {
        // 构造标签，包括 起止时间，年龄
        let time = '';
        let age = '';
        if (this.sectionData.lfrom && this.sectionData.lto) {
          let from = Utils.formatData2(this.sectionData.lfrom);
          let to = Utils.formatData2(this.sectionData.lto);

          time = parseInt(from.m) + '月' + parseInt(from.d) + '日 - ' + parseInt(to.m) + '月' + parseInt(to.d) + '日';
        }
        if (this.sectionData.ages) {
          age = GetDataObjUseId(AgeFilterData, this.sectionData.ages).label;
        }
        return this.sectionData.tags.slice(1).concat([time, age]);
      }
    },
    methods: {
      goDetail () {
        this.$router.push({path: '/pages/home/section.detail', query: {id: this.sectionData.id, type: this.sectionData.mname}});
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
      @include flex(flex-start, flex-start);

      .section-title-left {
        width: 122rpx;
      }

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
      }
    }

    .section-label {
      margin-top: 8rpx;
      @include flex(space-between, flex-start);

      .section-label-left {
        @include flex(flex-start, flex-start);
        width: 100%;

        .section-desc {
          display: inline-block;
          width: 120rpx;
          color: #9f9f9f;
          margin-top: 12rpx;
          font-size: 12px;
        }
      }

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


  }
</style>
