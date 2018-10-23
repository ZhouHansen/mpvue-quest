<template>
  <div class="organi-desc-container">
    <wx-parse :content="article"></wx-parse>
  </div>
</template>
<script>
  import wxParse from 'mpvue-wxparse';

  export default {
    props: ['params'],
    components: {
      wxParse
    },
    data () {
      return {
        article: this.params.htmlabout ? this.params.htmlabout : '机构介绍正在添加中.'
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';
  @import url("~mpvue-wxparse/src/wxParse.css");

  .organi-desc-container {
    border-top: $searchItemTopBorder;
    padding: 0 20rpx;
  }
</style>
