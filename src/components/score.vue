<template>
  <div class="score-container">
    <div v-if="type === 'show'">
      <span class="score-item selected" v-for="(item, index) in selectedNum" :key="index"></span>
      <span class="score-item half-selected" v-if="haveSalf"></span>
      <span class="score-item unselected" v-for="(item, index) in unSelectedNUm" :key="index"></span>
    </div>
    <div v-if="type === 'set'">
      <span class="score-item"
        :class="{'unselected': index + 1 > chooseScore, 'unselected': chooseScore === 0, 'selected': index + 1 <= chooseScore}"
        v-for="(item, index) in fillScore" :key="index" @click="tapChooseScore(index + 1)"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['score', 'type'],
  computed: {
    haveSalf () {
      if (this.score % 1 > 0) {
        return true;
      }
    },
    selectedNum () {
      return Math.floor(this.score);
    },
    unSelectedNUm () {
      if (this.haveSalf) {
        return 4 - this.selectedNum;
      } else {
        return 5 - this.selectedNum;
      }
    }
  },
  data () {
    return {
      chooseScore: 0,
      fillScore: 5
    };
  },
  methods: {
    tapChooseScore (e) {
      this.chooseScore = e;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .score-container {
    @include flex(flex-start);

    .score-item {
      width: 36rpx;
      height: 36rpx;
      display: inline-block;
      margin-right: 10rpx;
    }

    .selected {
      @include backgroundImg('../assets/images/star_selected.png');
    }

    .half-selected {
      @include backgroundImg('../assets/images/start_half_selected.png');
    }

    .unselected {
      @include backgroundImg('../assets/images/star_unselected.png');
    }

  }
</style>
