<template>
  <div>
    <div class="select-container" @click="tapFilter" v-if="filter.type !== 'date'">
      <span>{{filter.text || ''}}</span>
      <span class="select-icon"></span>
    </div>

    <div v-if="filter.type === 'date'">
      <picker class="weui-btn" mode="date" :value="filter.chooseDate" :start="startData" :end="'2028-01-01'" @change="dateChange">
        <div class="select-container">
          <span>{{filter.text || ''}}</span>
          <span class="select-icon"></span>
        </div>
      </picker>
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/index';

export default {
  props: ['filter', 'type'],
  data () {
    return {
    };
  },
  computed: {
    startData () {
      return Utils.formatDateToPicker(new Date(), 35);
    }
  },
  methods: {
    tapFilter () {
      if (this.filter.event) {
        this.$emit('filterEvent', this.filter.event);
      }
    },

    dateChange (e) {
      console.log('choose date', e);
      this.$emit('chooseDate', {id: this.filter.event, data: e.mp.detail.value});
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
