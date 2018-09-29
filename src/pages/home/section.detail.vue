<template>
  <div :class="{'overflow-hidden': overflowHiddenStatus}">
    <section-detail></section-detail>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import sectionDetail from '@/module/discovery/section.detail';

  export default {
    components: {
      sectionDetail
    },
    computed: mapState([
      'overflowHiddenStatus'
    ]),
    // 监听,当路由发生变化的时候执行
    watch: {
      $route: {
        handler: function (val, oldVal) {
          console.log(val);
        },
        // 深度观察监听
        deep: true
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '学课程，拿奖学金，学习乐翻天！',
        path: '/pages/home/section.detail?id=123'
        // imageUrl: ''
      };
    }
  };
</script>
<style lang="scss" scoped>
</style>
