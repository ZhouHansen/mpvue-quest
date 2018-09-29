<template>
  <div class="score-container">
    <div v-if="type === 'show'">
      <span class="score-item selected" :class="iconSize" v-for="(item, index) in selectedNum" :key="index"></span>
      <span class="score-item half-selected" :class="iconSize" v-if="haveSalf"></span>
      <span class="score-item unselected" :class="iconSize" v-for="(item, index) in unSelectedNUm" :key="index"></span>
    </div>
    <div v-if="type === 'set'">
      <span class="score-item big"
        :class="{'unselected': index + 1 > chooseScore, 'unselected': chooseScore === 0, 'selected': index + 1 <= chooseScore}"
        v-for="(item, index) in fillScore" :key="index" @click="tapChooseScore(index + 1)"></span>
    </div>
  </div>
</template>
<script>
/**
 * 展示分数： :score , :type="'show'"
 * 评价分数: :type="'set'" , @setScore
*/
export default {
  props: ['score', 'type', 'size', 'id'],
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
    },
    iconSize () {
      if (this.size === 'small') {
        return 'small';
      } else {
        return 'big';
      }
    }
  },
  data () {
    return {
      chooseScore: 1,
      fillScore: 5
    };
  },
  methods: {
    tapChooseScore (e) {
      this.chooseScore = e;
      let result = {};
      if (this.id) {
        result['id'] = this.id;
      }

      result['score'] = e;
      this.$emit('setScore', result);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .score-container {
    @include flex(flex-start);

    .score-item {
      display: inline-block;
      padding-right: 16rpx;
    }

    .small {
      width: 24rpx;
      height: 24rpx;
    }

    .big {
      width: 36rpx;
      height: 36rpx;
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
