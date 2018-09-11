<template>
  <div>
    <section-detail></section-detail>
  </div>
</template>
<script>
  import sectionDetail from '@/module/discovery/section.detail';

  export default {
    components: {
      sectionDetail
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '自定义转发标题',
        path: '/page/user?id=123'
      };
    }
  };
</script>
<style lang="scss" scoped>
</style>
