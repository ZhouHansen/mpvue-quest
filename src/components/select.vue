<template>
  <div>
    <div class="select-container" @click="tapFilter" v-if="filter.type !== 'date' && filter.type !== 'number'">
      <span>{{filter.text || ''}}</span>
      <span class="select-icon"></span>
    </div>

    <div v-if="filter.type === 'date'">
      <picker class="weui-btn" mode="date" :value="filter.chooseDate" :start="startData" :end="'2028-01-01'" @change="dateChangeDate" @cancel="dateCancel">
        <div class="select-container">
          <span>{{filter.text || ''}}</span>
          <span class="select-icon"></span>
        </div>
      </picker>
    </div>

    <div v-if="filter.type === 'number'">
      <picker class="weui-btn" mode="selector" :value="chooseAge" :range="ageData" :range-key="'text'" @change="dateChangeAge" @cancel="dateCancel">
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
import _ from 'lodash/core';

export default {
  props: ['filter', 'type'],
  data () {
    return {
      ageData: []
    };
  },
  mounted () {
    for (let i = 5; i < 20; i++) {
      this.ageData.push({text: i + '岁', id: i});
    }
  },
  computed: {
    startData () {
      return Utils.formatDateToPicker(new Date(), 35);
    },

    chooseAge () {
      if (this.type === 'number') {
        if (this.filter.chooseDate) {
          return _.indexOf(this.ageData, {id: this.filter.chooseDate});
        } else {
          return 0;
        }
      }
    }
  },
  methods: {
    tapFilter () {
      if (this.filter.event) {
        this.$emit('filterEvent', this.filter.event);
      }
    },

    dateChangeAge (e) {
      this.$emit('chooseDate', {id: this.filter.event, data: this.ageData[e.mp.detail.value].id});
    },

    dateChangeDate (e) {
      // console.log('choose date', e);
      this.$emit('chooseDate', {id: this.filter.event, data: e.mp.detail.value});
    },

    dateCancel (e) {
      this.$emit('chooseDate', {id: this.filter.event, data: undefined});
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
