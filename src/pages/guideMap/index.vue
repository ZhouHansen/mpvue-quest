<template>
  <div class="guide-map">
    <!-- 需要将index.json 中的设置手动复制到对应的文件内 -->
    <map-route v-if="routeInfo" :route-info="routeInfo"></map-route>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routeInfo: null
    };
  },
  onShow () {
    if (!this.$route.query.obj) {
      this.$wxUtils.toast({title: '路线规划失败，请重试！'});
      setTimeout(() => {
        this.$router.back();
      }, 3000);
      return;
    }

    let params = JSON.parse(this.$route.query.obj);

    let routeInfo = {
      startLat: params.slat,
      startLng: params.slng,
      startName: '我的位置',
      endLat: params.elat,
      endLng: params.elng,
      endName: params.ename,
      mode: 'car'
    };
    this.routeInfo = routeInfo;
  }
};
</script>

<style lang="scss" scoped>
  .guide-map {
    height: 100vh;
  }
</style>

