<template>
  <div class="label-container" :style="type === 'center' ? 'justify-content: center;' : 'justify-content: flex-start;'">
    <span class="label-header" v-if="headerLabelType === 'string' && typeText.length > 0">{{typeText}}</span>
    <span class="label-header" v-if="headerLabelType === 'array' && typeText[0].length > 0" v-for="(item, index) in typeText" :key="index">{{item}}</span>
    <span class="label-span" v-if="labelArr[0] && labelArr[0].length > 0 && item.length > 0" v-for="(item, index) in labelArr" :key="index">{{item}}</span>
    <span class="label-position" v-if="position && position.length > 0">{{position}}</span>
  </div>
</template>
<script>
import _ from 'lodash/core';
export default {
  props: ['typeText', 'labelArr', 'type', 'position'], // type center , flex-start
  data () {
    return {

    };
  },
  computed: {
    headerLabelType () {
      if (_.isArray(this.typeText)) {
        return 'array';
      } else {
        return 'string';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .label-container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    span {
      padding: 2rpx 8rpx;
      border-radius: 16rpx;
      font-size: 12px;
      margin-right: 16rpx;
      margin-top:10rpx;
    }

    .label-header {
      background-color: $labelBackgroundColor;
      color: $topic-color;
    }

    .label-span {
      background-color: $labelCommonBackgroundColor;
      color: $labelCommonColor;
    }

    .label-position {
      background-color: #fbfbfb;
    }
  }
</style>

