<template>
  <div class="select-container" @click="tapFilter">
    <span>{{filter.text || ''}}</span>
    <span class="select-icon"></span>
  </div>
</template>
<script>
export default {
  props: ['filter'],
  data () {
    return {

    };
  },
  methods: {
    tapFilter () {
      if (this.filter.event) {
        this.$emit('filterEvent', this.filter.event);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .select-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .select-icon {
      width: 24rpx;
      height: 24rpx;
      background: url('../assets/images/arrows_search.png') no-repeat 50% 50%;
      background-size: contain;
    }
  }
</style>
