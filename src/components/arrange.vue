<template>
  <div class="arrange-container">
    <div class="arrage-list">
      <div class="arrange-item" v-if="spec">
        <div class="arrange-icon book"></div>
        <div class="arrange-text">{{spec}}</div>
      </div>
      <div class="arrange-item" v-if="arrangeParams.lfrom && arrangeParams.lto">
        <div class="arrange-icon time"></div>
        <div class="arrange-text">{{fromAndTo}}</div>
      </div>
      <div class="arrange-item" v-if="ages">
        <div class="arrange-icon kidney"></div>
        <div class="arrange-text">{{ages}}</div>
      </div>
      <div class="arrange-item" v-if="arrangeParams.brief">
        <div class="arrange-icon info"></div>
        <div class="arrange-text">{{arrangeParams.brief}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {AgeFilterData, ProductSpecData, GetDataObjUseId} from '@/utils/default.data';
import Utils from '@/utils/index';
export default {
  props: ['arrangeParams'],
  computed: {
    ages () {
      let result = GetDataObjUseId(AgeFilterData, this.arrangeParams.ages);

      if (result) {
        return result.text;
      } else {
        return false;
      }
    },
    spec () {
      let result = GetDataObjUseId(ProductSpecData, this.arrangeParams.spec);

      if (result) {
        return result.text;
      } else {
        return false;
      }
    },
    fromAndTo () {
      if (this.arrangeParams.lfrom && this.arrangeParams.lto) {
        let from = Utils.formatData2(this.arrangeParams.lfrom);
        let to = Utils.formatData2(this.arrangeParams.lto);
        console.log(from);
        console.log(to);
        return from.y + '年' + from.m + '月' + from.d + '日 - ' + to.y + '年' + to.m + '月' + to.d + '日';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .arrange-container {

    .arrange-item {
      margin-top: 30rpx;
      font-size: 16px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;

      .arrange-icon {
        width: 36rpx;
        height: 36rpx;
        margin-right: 10rpx;
        flex-shrink: 0;
        margin-top: 4rpx;
      }

      .arrange-text {
        flex-shrink: 0;
        width: calc(100% - 40rpx);
        word-break: break-all;
      }

      .time {
        background: url('../assets/images/time.png') no-repeat 50% 50%;
        background-size: contain;
      }

      .kidney {
        background: url('../assets/images/i-kidney.png') no-repeat 50% 50%;
        background-size: contain;
      }

      .info {
        background: url('../assets/images/info-circle.png') no-repeat 50% 50%;
        background-size: contain;
      }

      .book {
        background: url('../assets/images/book.png') no-repeat 50% 50%;
        background-size: contain;
      }
    }
  }
</style>
