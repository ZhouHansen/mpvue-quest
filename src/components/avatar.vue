<template>
  <div class="banner" v-if="avatar" :style="{background: 'url(' + avatar + ') no-repeat', backgroundSize: 'cover'}"></div>
</template>

<script>
export default {
  props: ['avatar'],
  mounted () {
  }
};
</script>

<style>
  .banner {
    width: 100%;
    height: 20vh;
  }
</style>
