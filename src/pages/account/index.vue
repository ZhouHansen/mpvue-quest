<template>
  <div class="accound-container">
    用户页面
  </div>
</template>

<script>
import * as MutationsType from '@/store/mutation.type';
import {GetAddressUseLngLat} from '@/utils/location';
import Utils from '@/utils/index';

export default {
  components: {
  },
  data () {
    return {
    };
  },
  created () {
  },
  mounted () {
    this.$wxUtils.loading({title: '加载中...'});
  },
  onShow () {

  },
  onHide () {
    this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
  },
  onPullDownRefresh () {
  },
  computed: {
  },
  methods: {
  },

  onReachBottom () {
  }
};
</script>

<style scoped lang="scss">
  @import '../../assets/style/variables.scss';
</style>
