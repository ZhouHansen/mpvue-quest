<template>
  <div class="search-container">
    <search-header></search-header>
    <div class="search-history-list">
      <div class="title">
        <have-topic-title :title="'搜索历史'"></have-topic-title>
      </div>
      <div class="list">
        <span class="item" v-for="(item, index) in history" :key="index">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import SearchHeader from '@/module/search.header';
  import haveTopicTitle from '@/components/left.border.title';

  export default {
    components: {
      searchHeader: SearchHeader,
      haveTopicTitle
    },
    data () {
      return {
        history: [
          {name: '佛陀传'},
          {name: '一行法师'},
          {name: '讲述了多年前'},
          {name: '佛陀传'},
          {name: '一行法师'},
          {name: '讲述了多年前的道理'}
        ]
      };
    }
  };
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .search-container {
    width: 100%;
    min-height: 100vh;
    border-top: $navigateTitleBottomBorder;

    .search-history-list {
      border-top: 1rpx solid #efefef;
      padding: 40rpx 5%;

      .list {
        margin-top: 28rpx;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;

        .item {
          padding: 12rpx 16rpx;
          border: 1px solid #e6e6e6;
          font-size: 13px;
          border-radius: 30rpx;
          margin-right: 16rpx;
          margin-top: 20rpx;
        }
      }
    }
  }
</style>
