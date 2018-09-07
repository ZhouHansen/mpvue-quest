<template>
  <div class="search-container">
    <search-header @startSearchEvent="startSearch" :input-val="inputVal" :input-val-enter="inputVal"></search-header>
    <div class="search-history-list">
      <div class="title">
        <have-topic-title :title="'搜索历史'"></have-topic-title>
      </div>
      <div class="list">
        <span class="item" v-for="(item, index) in history" :key="index" @click="useHistorySearch(item.name)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import WxUtils from '@/utils/wx.utils';
  import SearchHeader from '@/module/search.header';
  import haveTopicTitle from '@/components/left.border.title';

  export default {
    components: {
      searchHeader: SearchHeader,
      haveTopicTitle
    },
    data () {
      return {
        inputVal: '',
        history: []
      };
    },
    mounted () {
      this.getSearchHistory();
    },
    methods: {
      startSearch (e) {
        this.inputVal = e;
        this.getSearchHistory();
        this.sendSearchRequest(e);
      },

      useHistorySearch (e) {
        this.inputVal = e;
        this.sendSearchRequest(e);
      },

      getSearchHistory () {
        this.history = this.$storage.get(this.$storageTypeName.hr_search_history);
      },

      sendSearchRequest (params) {
        WxUtils.loading({show: true, title: '查找中...'});
        this.$network.search.search({type: 'a'}).then(res => {
        }).catch(err => {
          console.log(err);
        });
      }
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
