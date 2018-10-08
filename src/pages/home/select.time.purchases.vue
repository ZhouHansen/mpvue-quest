<template>
  <div class="select-time-container">
    <div class="select-time-content">
      <hoo-left-border-title :title="'选择课程日期'"></hoo-left-border-title>
      <div class="fix-time-select">
        <div class="fix-time-item" :class="{'fix-time-checked': chooseTimestamp === item.timestamp}" v-for="(item,index) in selectTime" :key="index" @click="chooseDate(item)">
          <div>{{item.title}}</div>
          <div>{{item.date}}</div>
        </div>
      </div>
      <div class="select-time-picker">
        <picker class="weui-btn" mode="date" :value="pickerValue" :start="pickerStartDate" end="2099-01-01" @change="DateChange">
          <div class="picker-btn">
            <span class="picker-btn-icon"></span>
            <span class="picker-btn-text">点击选择日期</span>
          </div>
        </picker>
      </div>
    </div>
  </div>
</template>
<script>
  import Utils from '@/utils/index';
  import * as MutationsType from '@/store/mutation.type';
  import hooLeftBorderTitle from '@/components/left.border.title';

  export default {
    components: {
      hooLeftBorderTitle
    },
    data () {
      return {
        selectTime: [],
        chooseTimestamp: 0,
        date: null
      };
    },
    mounted () {
      this.$wxUtils.setNavTitle('选择时间');
      this.$network.discovery.getSelectDate().then(res => {
        this.selectTime = res;
      });
    },
    computed: {
      pickerStartDate () {
        return Utils.formatDateToPicker(new Date());
      },
      pickerValue () {
        if (this.chooseTimestamp > 0) {
          return Utils.formatDateToPicker(new Date(this.chooseTimestamp));
        }
      }
    },
    methods: {
      DateChange (e) {
        this.date = e.mp.detail.value;
        this.chooseTimestamp = new Date(e.mp.detail.value).getTime();
        this.submit();
      },

      chooseDate (e) {
        this.chooseTimestamp = e.timestamp;
        this.submit();
      },

      submit () {
        this.$store.commit(MutationsType.SET_ORDER_PARAMS, {date: this.chooseTimestamp});
        // console.log(this.$store.state.discovery.order);
        this.$router.push('/pages/home/section.submit.order');
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .select-time-container {
    background-color: #f9f9f9;
    min-height: 100vh;

    .select-time-content {
      background-color: #ffffff;
      padding: 40rpx;
    }

    .fix-time-select {
      @include flex(space-between, center, row wrap);
      font-size: 15px;

      .fix-time-item {
        margin-top: 30rpx;
        width: calc((100vw - 280rpx )/ 2);
        height: 88rpx;
        color: $topic-color;
        border: 1rpx solid $topic-color;
        border-radius: 16rpx;
        padding: 16rpx 0 16rpx 80rpx;
        &:nth-child(odd) {
          margin-right: 30rpx;
        }
      }

      .fix-time-checked {
        color: #ffffff;
        background-color: $topic-color;
      }
    }

    .select-time-picker {
      margin-top:30rpx;

      .picker-btn {
        border: 1px solid $topic-color;
        padding: 40rpx 0;
        width: 100%;
        color: $topic-color;
        border-radius: 16rpx;
        @include flex(center);

        .picker-btn-icon {
          @include backgroundImg('../../assets/images/miaojie_seller_calendar.png');
          width: 32rpx;
          height: 28rpx;
          margin-right: 8rpx;
        }

        .picker-btn-text {
          margin-top:2rpx;
        }
      }
    }
  }
</style>
