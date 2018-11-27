<template>
  <div class="calendar-container" v-if="showCalendar">
    <div class="calendar-bg" @click="hideCalendar"></div>
    <div class="calendar-body">
      <div class="calendar-title">
        <span class="calendar-title-cancle" @click="hideCalendar">取消</span>
        <div class="calendar-title-choose">
          <span class="calendar-title-icon calendar-title-icon-left" @click="preMonth"></span>
          <span class="calendar-title-show"><span>{{year}} - {{month}}</span></span>
          <span class="calendar-title-icon calendar-title-icon-right" @click="nextMonth"></span>
        </div>
        <span class="calendar-title-confirm" @click="resetCalendar">重置</span>
      </div>
      <div class="calendar-week">
        <span v-for="(item, index) in week" :key="index" class="calendar-week-item"
          :class="{'calendar-week-item-holiday': index === 5 || index === 6}"
        >{{item}}</span>
      </div>
      <div class="calendar-day">
        <div v-for="(item, index) in dayData" :key="index" class="calendar-day-row">
          <div v-for="(day, dindex) in item" :key="dindex" class="calendar-day-item"
            :class="{'week-7': day!== '' && (dindex === 5 || dindex === 6),
              'calendar-disabled': day.disabled
            } "
            :id="day.id"
            @click="chooseDate(day)"
          >
          <span class="calendar-day-item-num"
            v-if="day !== ''"
            :class="{
              'calendar-checked-default':chooseToday === day.id,
              'calendar-checked': chooseDay === day.id}"
          >{{day.number}}</span>
          <span class="calendar-day-item-text">{{day.text?day.text:''}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import HolidayData from '@/utils/holiday.data';
import Calendar from '@/plugs/chinese-calendar';

export default {
  props: ['params'], // {id:'', chooseDayText: '2018-1-2', minDate: '2018-10-11', maxDate: '2019-2-10'}
  data () {
    return {
      todayObj: {},
      chooseDay: '', // 选择的日期
      chooseToday: '',
      year: '',
      month: '',
      day: '', // 今日
      week: ['一', '二', '三', '四', '五', '六', '日'],
      dayData: [],
      limitMinDate: null,
      limitMaxDate: null,
      showCalendar: true
    };
  },
  mounted () {
    let date = new Date();

    this.todayObj = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };

    this.chooseToday = this.todayObj.year + '-' + this.todayObj.month + '-' + this.todayObj.day;

    if (this.params && this.params.minDate) {
      let splitArr = this.params.minDate.split('-');
      this.limitMinDate = {
        y: splitArr[0] * 1,
        m: splitArr[1] * 1,
        d: splitArr[2] * 1
      };
    }

    if (this.params && this.params.maxDate) {
      let splitArr = this.params.maxDate.split('-');
      this.limitMaxDate = {
        y: splitArr[0] * 1,
        m: splitArr[1] * 1,
        d: splitArr[2] * 1
      };
    }

    if (this.params && this.params.chooseDayText) {
      // console.log(this.params.chooseDayText);
      this.chooseDay = this.params.chooseDayText;
      let splitArr = this.params.chooseDayText.split('-');
      let request = {
        year: splitArr[0] * 1,
        month: splitArr[1] * 1,
        day: splitArr[2] * 1
      };

      this.setDateParams(request);
    } else {
      this.setDateParams(this.todayObj);
    }
  },
  methods: {
    setDateParams (obj) {
      this.year = obj.year;
      this.month = obj.month;
      this.day = obj.day;
      this.dayData = [];

      this.getShowDayList();
    },

    getShowDayList () {
      let row = [];
      for (let i = 1; i < 42; i++) { // 7 * 5line
        let day = new Date(this.year, this.month - 1, i);
        let weekDay = day.getDay();
        let month = day.getMonth() + 1;
        let monthDay = day.getDate();
        let year = day.getFullYear();
        let str = `${year}-${month}-${monthDay}`;

        let obj = {
          text: null,
          id: str,
          number: null,
          disabled: false
        };

        // 假期，农历显示
        let calendarTextObj = Calendar.solar2lunar(year, month, monthDay);
        if (calendarTextObj.festival.length > 0) {
          obj.text = calendarTextObj.festival[0];
        } else
        if (calendarTextObj.IMonthCn && calendarTextObj.IDayCn) {
          if (calendarTextObj.IDayCn === '初一') {
            obj.text = calendarTextObj.IMonthCn;
          } else {
            obj.text = calendarTextObj.IDayCn;
          }
        }

        // 限制选取最小日期
        if (this.limitMinDate && (year < this.limitMinDate.y ||
          (year === this.limitMinDate.y && month < this.limitMinDate.m) ||
          (year === this.limitMinDate.y && month === this.limitMinDate.m && monthDay < this.limitMinDate.d))
        ) {
          obj.disabled = true;
        }

        // 限制选取最大日期
        if (this.limitMaxDate && (year > this.limitMaxDate.y ||
          (year === this.limitMaxDate.y && month > this.limitMaxDate.m) ||
          (year === this.limitMaxDate.y && month === this.limitMaxDate.m && monthDay > this.limitMaxDate.d))
        ) {
          obj.disabled = true;
        }

        // 构造本月的日历数据
        if (month === this.month) {
          if (i === 1) {
            // 判断第一天的日期，
            // @d 用于控制第一天显示的星期 （d = 0 开头为星期日 / d = 1 开头为星期一）
            for (let d = 1; d < weekDay; d++) {
              row.push('');
            }

            obj.number = monthDay;
            row.push(obj);
          } else {
            obj.number = monthDay;
            row.push(obj);
          }
        } else {
          row.push('');
        }

        if (row.length % 7 === 0) {
          if (i > 35 && row[0] === '') {
            row = [];
            return;
          }
          this.dayData.push(row);
          row = [];
        }
      };
      // console.log(this.dayData);
    },

    preMonth () {
      this.setMonth(parseInt(this.month) - 1);
    },

    nextMonth () {
      this.setMonth(this.month + 1);
    },

    setMonth (month) {
      let setDate = new Date(this.year, month - 1, this.day);
      let params = {
        year: setDate.getFullYear(),
        month: setDate.getMonth() + 1,
        day: setDate.getDate()
      };

      this.setDateParams(params);
    },

    chooseDate (params) {
      if (!params.disabled) {
        this.chooseDay = params.id;

        let arr = params.id.split('-');
        let result = {
          data: params.id,
          y: arr[0],
          m: arr[1],
          d: arr[2],
          id: this.params.id
        };

        this.$emit('chooseDate', result);
        this.hideCalendar();
      }
    },

    resetCalendar () {
      this.chooseDay = null;

      let result = {
        data: undefined,
        y: null,
        m: null,
        d: null,
        id: this.params.id
      };

      this.$emit('chooseDate', result);
      this.hideCalendar();
    },

    hideCalendar () {
      this.showCalendar = false;
      this.$emit('hideChooseDate');
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .calendar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 999;

    .calendar-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .calendar-body {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 30rpx 0;
      background-color: #ffffff;

      .calendar-title {
        @include flex(space-between, center);
        margin: 0 5%;

        .calendar-title-confirm {
          color: $topic-color;
          flex-shrink: 0;
        }

        .calendar-title-cancle {
          color: #515151;
          flex-shrink: 0;
        }

        .calendar-title-choose {
          @include flex(center, center);

          .calendar-title-icon {
            height: 40rpx;
            width: 40rpx;
            padding: 0 50rpx;
            flex-shrink: 0;
          }

          .calendar-title-icon-left {
            @include backgroundImg('../assets/images/calendar_arrow_left.png');
          }

          .calendar-title-icon-right {
            @include backgroundImg('../assets/images/calendar_arrow_right.png');
          }


          .calendar-title-show {
            flex-shrink: 0;
            span {
              font-weight: bold;
              margin-right: 10rpx;
            }
          }
        }
      }

      .calendar-week {
        @include flex(space-between, center);
        margin-top: 30rpx;
        padding-top: 20rpx;
        border-top: 1rpx solid #dcdcdc;

        .calendar-week-item {
          text-align: center;
          flex-basis: calc(100% / 7);
          padding: 10rpx 0;
          font-weight: bold;
        }

        .calendar-week-item-holiday {
          color: #9d9d9d;
        }
      }

      .calendar-day {
        .calendar-day-row {
          @include flex(space-between, flex-start);

          .calendar-day-item {
            text-align: center;
            flex-basis: calc(100% / 7);
            padding-top: 30rpx;
            @include flex(center, center, column nowrap);

            .calendar-day-item-num {
              width: 48rpx;
              height: 48rpx;
              text-align: center;
              line-height: 48rpx;
              border-radius: 100%;
              font-weight: bold;
            }

            .calendar-day-item-text  {
              font-size: 10px;
              line-height:normal;
              height: 30rpx;
            }
          }

          .week-6 {
            background-color: #ddffdd;
          }

          .week-7 {
            background-color: #fff3dd;
          }

          .calendar-checked-default {
            background-color: $topic-color;
            color: #ffffff;
          }

          .calendar-checked {
            background-color: $orange-color;
            color: #ffffff;
          }

          .calendar-disabled {
            opacity: 0.7;
          }
        }
      }
    }
  }
</style>
