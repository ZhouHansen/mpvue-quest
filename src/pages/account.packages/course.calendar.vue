<template>
  <div class="course-calendar-container">
    <div class="date-list" v-if="courseList && courseList.length > 0">
      <div class="date-item" v-for="item in courseList" :key="item.id">
        <div class="date-title">
          <hoo-have-left-border-title :title="todayStamp === item[0].fromStamp?'今天（' + item[0].fromDate.m + '月' + item[0].fromDate.d + '日' + '）': item[0].fromDate.m + '月' + item[0].fromDate.d + '日'"></hoo-have-left-border-title>
        </div>
        <div class="date-total">共{{item.length}}节课</div>
        <div class="course-list">
          <div class="course-item" v-for="(i, num) in item" :key="num" @click="visitOrder(i.orderno)">
            <div class="course-item-time">{{i.fromTimeString}} - {{i.toTimeString}}</div>
            <div class="course-item-name ellipsis">{{i.lessonname}}</div>
            <div class="course-item-visit">
              <span>查看</span>
              <span class="course-item-visit-icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hoo-empty :text="'~还没有课程信息~'" :type="'normal'" v-if="courseList.length === 0"></hoo-empty>
    <div class="footer" @click="visitCourseHistory">
      <span>查看历史课程</span>
      <span class="footer-icon"></span>
    </div>
  </div>
</template>
<script>
import _ from 'lodash/core';
import Utils from '@/utils/index';
import hooEmpty from '@/components/empty';
import hooHaveLeftBorderTitle from '@/components/left.border.title';

export default {
  components: {
    hooEmpty,
    hooHaveLeftBorderTitle
  },
  props: [],
  data () {
    return {
      defaultCourseList: [],
      courseList: [],
      todayStamp: parseInt(new Date().getTime() / 1000)
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('课程日历');
    this.getOrderList();

    // this.$network.account.getCourseList({}, null, 'weapp/orders/lesson');
  },
  methods: {
    getOrderList () {
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.account.getCourseCalendarList().then(res => {
        // console.log('res', res);
        res.data.forEach((item, index) => {
          let from = new Date(item.cfrom);
          let to = new Date(item.cto);
          item.fromStamp = parseInt(from.getTime() / 1000);
          item.fromDate = Utils.formatData2(item.cfrom.split(' ')[0], '-');
          item.fromTime = Utils.formatTime2(from);
          item.fromTimeString = item.fromTime.h + ':' + item.fromTime.m;
          item.fromDateString = item.fromDate.y + '-' + item.fromDate.am + '-' + item.fromDate.ad;

          item.toStamp = parseInt(to.getTime() / 1000);
          item.toDate = Utils.formatData2(item.cto.split(' ')[0], '-');
          item.toTime = Utils.formatTime2(to);
          item.toTimeString = item.toTime.h + ':' + item.toTime.m;
        });

        res.data.sort((a, b) => {
          return a.fromStamp - b.fromStamp;
        });

        let result = [[res.data[0]]];
        res.data.forEach((item, index) => {
          let flg = false;

          result.forEach((ritem, rindex) => {
            let find = _.find(ritem, {fromDateString: item.fromDateString});

            if (find) {
              result[rindex].push(item);
              flg = true;
            }
            if (result.length - 1 === rindex && !flg) {
              let arr = [item];
              result.push(arr);
            }
          });
        });

        this.defaultCourseList = res.data;
        this.courseList = result;
        // console.log(this.courseList);
        this.$wxUtils.loading({show: false});
      });
    },

    visitOrder (e) {
      this.$router.push({path: '/pages/account.packages/course.calendar/course.order', query: {id: e}});
    },

    visitCourseHistory () {
      this.$router.push('/pages/account.packages/course.calendar/course.history');
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .course-calendar-container {
    height: calc(100vh - 100rpx);
    overflow: auto;
    background-color: #f9f9f9;

    .date-list {
      padding: 40rpx;
      background-color: #ffffff;

      .date-item {
        margin-top: 50rpx;

        &:first-child {
          margin-top: 0;
        }
        .date-total {
          color: $topic-color;
          padding: 30rpx 0;
          margin-left: 24rpx;
          border-bottom: 1rpx solid #eaeaea;
          font-weight: bold;
        }

        .course-list {
          padding-left: 24rpx;

          .course-item {
            padding: 30rpx 0;
            border-bottom: 1rpx solid #eaeaea;
            @include flex();

            .couse-item-name {

            }

            .course-item-name {
              flex-basis: 50%;
              flex-shrink: 0;
              color: #000000;
              font-weight: bold;
            }

            .course-item-visit {
              color: #b9b9b9;
              flex-shrink: 0;

              .course-item-visit-icon {
                width: 26rpx;
                height: 26rpx;
                display: inline-block;
                margin-left: 16rpx;
                @include backgroundImg('../../assets/images/arrow_right.png');
              }
            }
          }
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 28rpx 0;
      text-align: center;
      background-color: #ffffff;
      color: #b9b9b9;
      border-top: 1rpx solid #efefef;
      box-shadow: 0 4rpx 8rpx #e8e8e8;

      .footer-icon {
        width: 26rpx;
        height: 26rpx;
        display: inline-block;
        margin-left: 16rpx;
        @include backgroundImg('../../assets/images/arrow_right.png');
      }
    }
  }
</style>
