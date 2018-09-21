<template>
  <div class="organi-desc-container">
    这里是富文本编辑器的内容
    <wx-parse :content="article"></wx-parse>
  </div>
</template>
<script>
  import wxParse from 'mpvue-wxparse';

  export default {
    props: [''],
    components: {
      wxParse
    },
    data () {
      return {
        article: '<div>我是HTML代码</div>'
      };
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';
  @import url("~mpvue-wxparse/src/wxParse.css");

  .organi-desc-container {
    border-top: $searchItemTopBorder;
  }
</style>
