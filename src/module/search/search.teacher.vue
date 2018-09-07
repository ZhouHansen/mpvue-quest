<template>
  <div class="search-teacher-container">
    <div class="teacher-filter-list">
      <div class="teacher-filter-item">
        <hoo-select :filter="{text: '学科', event: 'type'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="teacher-filter-item">
        <hoo-select :filter="{text:'认证', event: 'auth'}" @filterEvent="chooseFilter"></hoo-select>
      </div>
      <div class="teacher-filter-item" @click="getOrderList">
        <div class="teacher-praise">
          <span>好评</span>
          <span class="teacher-praise-icon"
           :class="{
            'normal-icon': orderContrl === 'normal',
            'positive-order-icon': orderContrl === 'positive',
            'negative-order-icon': orderContrl === 'negative'}"></span>
        </div>
      </div>
    </div>
    <div class="teacher-content">
      <div class="teacher-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter"></filter-list>
      </div>
      <div class="teacher-list">
        <div class="teacher-item"></div>
        <div class="teacher-item"></div>
        <div class="teacher-item"></div>
        <div class="teacher-item"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import hooSelect from '@/components/select';
  import filterList from '@/module/search/search.header.filter.list';

  export default {
    components: {
      hooSelect,
      filterList
    },
    data () {
      return {
        showFilterItemDesc: false,
        chooseFilterType: '',
        orderContrl: 'normal'
      };
    },
    methods: {
      chooseFilter (e) {
        if (this.chooseFilterType === '') {
          this.chooseFilterType = e;
          if (!this.showFilterItemDesc) {
            this.showFilterItemDesc = true;
            this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
          }
        } else
        if (this.chooseFilterType === e) {
          this.showFilterItemDesc = !this.showFilterItemDesc;
          this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, this.showFilterItemDesc);
          return false;
        } else
        if (this.chooseFilterType !== e) {
          this.chooseFilterType = e;
          if (!this.showFilterItemDesc) {
            this.showFilterItemDesc = true;
            this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
          }
        }
      },

      doneChooseFilter (e) {
        console.log('接收到的过滤参数', e);
        this.showFilterItemDesc = false;
      },

      getOrderList () {
        console.log('修改排序');
        if (this.showFilterItemDesc) {
          this.showFilterItemDesc = false;
          this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
        }

        if (this.orderContrl === 'normal') {
          this.orderContrl = 'positive';
        } else
        if (this.orderContrl === 'positive') {
          this.orderContrl = 'negative';
        } else {
          this.orderContrl = 'normal';
        }
      }
    }
  };
</script>
<style lang="scss" scope>
  .search-teacher-container {
    width: 100%;
    .teacher-filter-list {
      display:flex;
      flex-flow:row nowrap;
      justify-content:space-between;
      align-items:center;
      padding:24rpx 20rpx;


      .teacher-filter-item {
        width: 26%;
        padding: 0 6%;
        border-right: 1rpx solid #f2f2f2;

        &:last-child {
          border: 0;
        }

        .teacher-praise {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;

          .teacher-praise-icon {
            width: 24rpx;
            height: 24rpx;
          }

          .normal-icon {
            background: url('../../assets/images/list_nor.png') no-repeat 50% 50%;
            background-size: contain;
          }

          //正序
          .positive-order-icon {
            background: url('../../assets/images/list_nor_p.png') no-repeat 50% 50%;
            background-size: contain;
          }
          //倒序
          .negative-order-icon {
            background: url('../../assets/images/list_nor_n.png') no-repeat 50% 50%;
            background-size: contain;
          }
        }
      }
    }

    .teacher-content {
      position: relative;

      .teacher-item {
        border-top: 1rpx solid #bfbfbf;
        height: 10vh;
        background-color: palevioletred;
        width: 100%;
        padding: 40rpx;
      }
    }
  }
</style>
