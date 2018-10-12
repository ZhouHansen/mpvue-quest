<template>
  <div class="search-empty-container">
    <div class="saerch-empty-icon">
      <img :src="emptyIcon" :mode="'aspectFit'">
    </div>
    <div class="search-empty-text">～没搜到相关内容～</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      emptyIcon: require('@/assets/images/ic_empty_search.png')
    };
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .search-empty-container {
    text-align: center;
    margin-top:20vh;

    .saerch-empty-icon {
      img {
        width: 50vw;
        height: 33vw;
      }
    }

    .search-empty-text {
      font-size: 16px;
      color: #9f9f9f;
    }
  }
</style>
