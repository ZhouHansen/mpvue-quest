<template>
  <div class="search-container" :class="{'overflow-hidden':isOverflow}">
    <search-header @startSearchEvent="startSearch" @chooseFilterType="filterType" :input-val="inputVal" :input-val-enter="inputVal"></search-header>
    <div class="search-history-list" v-if="!alreadyUseSearch">
      <div class="title">
        <have-topic-title :title="'搜索历史'"></have-topic-title>
      </div>
      <div class="list">
        <span class="item" v-for="(item, index) in history" :key="index" @click="useHistorySearch(item.name)">{{item.name}}</span>
      </div>
    </div>
    <!-- Course -->
    <search-course v-if="alreadyUseSearch && filterTypeVal === 'course'"></search-course>

    <!-- organization -->
    <search-organization v-if="alreadyUseSearch && filterTypeVal === 'organi'"></search-organization>

    <!-- teacher -->
    <search-teacher v-if="alreadyUseSearch && filterTypeVal === 'teacher'"></search-teacher>
  </div>
</template>
<script>
  // import WxUtils from '@/utils/wx.utils';
  import haveTopicTitle from '@/components/left.border.title';
  import searchHeader from '@/module/search/search.header';
  import searchCourse from '@/module/search/search.course';
  import searchOrganization from '@/module/search/search.organization';
  import searchTeacher from '@/module/search/search.teacher';

  export default {
    components: {
      searchHeader,
      haveTopicTitle,
      searchCourse,
      searchOrganization,
      searchTeacher
    },
    data () {
      return {
        alreadyUseSearch: false,
        inputVal: '',
        history: [],
        filterTypeVal: ''
      };
    },
    computed: {
      isOverflow: function () {
        console.log(this.$store);
        return this.$store.state.search.isOverFlowStatu;
      }
    },
    onReady () {
      this.getSearchHistory();
    },
    mounted () {
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
        // WxUtils.loading({show: true, title: '查找中...'});
        this.$network.search.searchCourse({type: 'a'}).then(res => {
          this.alreadyUseSearch = true;
          console.log('返回模拟查找数据', res);
        }).catch(err => {
          console.log(err);
        });
      },

      filterType (e) {
        console.log(e);
        this.filterTypeVal = e;
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

    .search-header-container {
      border-bottom: $navigateTitleBottomBorder;
    }

    .search-history-list {
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
          color: #000000;
        }
      }
    }
  }
</style>
