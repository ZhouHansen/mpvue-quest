<template>
  <div class="recommend-organi-container">
    <div class="title">推荐品牌机构</div>
    <div class="recommend-scroll">
      <scroll-view class="recommend-list" :scroll-x="'true'" :scroll-with-animation="'true'">
        <div class="recommend-item none" v-if="params.length === 0"><span>暂无推荐</span></div>
        <div class="recommend-item"
          v-if="params.length > 0"
          v-for="(item, index) in params" :key="index" @click="visitOrgani(item.id)"
          :style="{background: 'url(' + item.coverfile + ') no-repeat 50% 50%', backgroundSize: 'cover'}"
          ></div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['params'],
    data () {
      return {
      };
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
    border-radius: 16rpx;
    background-color: #ffffff;
    width: calc(100vw - 40rpx);
    height: calc(35vh - 80rpx);

    .title {
      border-left: 8rpx solid $topic-color;
      padding-left: 20rpx;
      color: #000000;
      font-size: 16px;
    }

    .recommend-scroll {
      overflow: hidden;
      white-space: nowrap;
    }

    .recommend-list {
      margin-top: 20rpx;
      width: 100%;

      .recommend-item {
        display: inline-block;
        width: 25vw;
        height: 25vw;
        border-radius: 16rpx;
        margin-top: 20rpx;
        margin-right: 10rpx;

        &:last-child {
          margin-right: 40rpx;
        }
      }

      .none {
        border: 1rpx dashed #d3d3d3;
        text-align: center;
        line-height: 25vw;
        vertical-align: top;

        span {
          color: #b4b4b4;
          font-size: 12px;
          border-bottom: 1rpx dashed #d3d3d3;
        }
      }
    }
  }
</style>
