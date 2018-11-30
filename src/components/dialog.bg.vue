<template>
  <div class="dialog-bg-container">
    <div class="dialog-bg" v-if="showDialogStatus.background" @click="hideDialog"></div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import * as MutationType from '@/store/mutation.type';

  export default {
    computed: mapState([
      // 映射 this.showDialogStatus 为 store.state.showDialogStatus
      'showDialogStatus'
    ]),
    methods: {
      hideDialog () {
        this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {
          background: false,
          groupOrder: false,
          bindPhone: false,
          feedback: false
        });
      }
    }
  };
</script>
<style lang="scss" scope>
  .dialog-bg {
    position: fixed;
    z-index: 998;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>

