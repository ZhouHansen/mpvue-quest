<template>
  <div class="search-container" :class="{'overflow-hidden':isOverflow}">
    <search-header
      @startSearchEvent="startSearch"
      @chooseFilterType="filterType"
      @inputFocus="inputFocus"
      :input-val="inputVal"
      :input-val-enter="inputVal"></search-header>
    <div class="search-history-list" v-if="!alreadyUseSearch">
      <div class="title">
        <have-topic-title :title="'搜索历史'"></have-topic-title>
      </div>
      <div class="list">
        <span class="item" v-for="(item, index) in history" :key="index" @click="useHistorySearch(item.name)">{{item.name}}</span>
      </div>
    </div>
    <!-- Course -->
    <search-course v-if="alreadyUseSearch && filterTypeVal === 'course'" :filter-object="filterObject"></search-course>

    <!-- organization -->
    <search-organization v-if="alreadyUseSearch && filterTypeVal === 'organi'" :filter-object="filterObject"></search-organization>

    <!-- teacher -->
    <search-teacher v-if="alreadyUseSearch && filterTypeVal === 'teacher'" :filter-object="filterObject"></search-teacher>
  </div>
</template>
<script>
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
        history: [],
        inputVal: '',
        filterTypeVal: ''
      };
    },
    computed: {
      isOverflow: function () {
        return this.$store.state.search.isOverFlowStatu;
      },
      filterObject: function () {
        return {
          inputVal: this.inputVal ? false : this.inputVal,
          filterTypeVal: this.filterTypeVal ? false : this.filterTypeVal
        };
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
        this.alreadyUseSearch = true;
      },

      useHistorySearch (e) {
        this.inputVal = e;
        this.alreadyUseSearch = true;
      },

      getSearchHistory () {
        this.history = this.$storage.get(this.$storageTypeName.hr_search_history);
      },

      filterType (e) {
        console.log(e);
        this.inputVal = '';
        this.filterTypeVal = e;
      },

      inputFocus () {
        // this.inputVal = ''; // 清除输入的的查找内容
        this.alreadyUseSearch = false;
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
