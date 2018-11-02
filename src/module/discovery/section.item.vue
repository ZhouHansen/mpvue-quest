<template>
  <div class="section-container" @click="goDetail">
    <div class="section-cover" :mode="asceptFill" :style="'background: url(' + sectionData.coverfile + ') no-repeat 50% 50%; background-size: cover;'"></div>
    <div class="section-group">
      <div class="section-title">
        <div class="section-title-left">
          <div class="section-avatar" :style="'background: url(' + sectionData.coverfile2 + ') no-repeat 50% 50%; background-size: cover;'"></div>
        </div>
        <div class="section-desc ellipsis" v-if="sectionData.instsname">{{sectionData.instsname}}</div>
      </div>
      <div class="section-inf">
        <text class="section-inf-title line-clamp-2">{{sectionData.name}}</text>
      </div>
    </div>
    <div class="section-label">
      <div class="section-label-left">
        <hoo-label :type-text="sectionData.tags[0]" :label-arr="tagslist"></hoo-label>
      </div>
      <div class="section-distance" v-if="distanceToSection">{{distanceToSection}}</div>
    </div>
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

        let cityArr = this.sectionData.city.split(',');

        if (wxAddress.result.address_component.city.indexOf(cityArr[1]) > -1) {
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
          if (parseInt(from.m) === parseInt(to.m) && parseInt(from.d) === parseInt(to.d)) {
            time = parseInt(from.m) + '月' + parseInt(from.d) + '日';
          } else {
            time = parseInt(from.m) + '月' + parseInt(from.d) + '日 - ' + parseInt(to.m) + '月' + parseInt(to.d) + '日';
          }
        }
        if (this.sectionData.ages) {
          age = GetDataObjUseId(AgeFilterData, this.sectionData.ages).label;
        }
        return this.sectionData.tags.slice(1).concat([age, time]);
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
    margin: 40rpx;
    border-radius: 20rpx;
    background-color: #ffffff;
    overflow: hidden;
    padding-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx #c7c7c7;

    .section-cover {
      width: 100%;
      height: 45vw;
    }

    .section-group {
      @include flex(flex-start, center);
      padding: 0 30rpx;
      margin-top: 20rpx;

      .section-title {
        @include flex(center, center, column nowrap);
        font-size: 12px;
        margin-right: 20rpx;
        .section-avatar {
          width: 50rpx;
          height: 50rpx;
          border-radius: 16rpx;
          flex-shrink: 0;
          margin-right: 10rpx;
        }
      }

      .section-inf {
        .section-inf-title {
          font-size: 16px;
          color: #46311E;
        }
      }
    }

    .section-label {
      padding: 0 30rpx;
      margin-top: 10rpx;
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




  }
</style>
