<template>
  <div class="course-calendar-container">
    <div class="date-list" v-if="courseList && courseList.length > 0">
      <div class="date-item" v-for="item in courseList" :key="item.id">
        <div class="date-title">
          <hoo-have-left-border-title :title="item[0].fromDate.y + '年' + item[0].fromDate.m + '月' + item[0].fromDate.d + '日'"></hoo-have-left-border-title>
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
    <div class="footer" >
      <div class="footer-item" @click="visitCourseHistory">
        <span>历史课程</span>
      </div>
      <div class="footer-item" @click="visitCourseWaitPay">
        <span>待支付</span>
      </div>
      <div class="footer-item" @click="visitCourseWaitAppra">
        <span>待评价</span>
      </div>
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
      total: 0,
      limit: 15,
      offset: 0,
      defaultCourseList: [],
      courseList: []
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('课程日历');
    this.getOrderList();
    // this.$network.account.getCourseList({}, null, 'weapp/orders/lesson');
  },
  methods: {
    refreshParams () {
      this.total = 0;
      this.offset = 0;
      this.courseList = [];
    },

    getOrderList () {
      let params = {
        offset: this.offset,
        limit: this.limit
      };
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.account.getCourseCalendarList(params).then(res => {
        // console.log('res', res);
        res.data.forEach((item, index) => {
          let from = new Date(item.cfrom);
          let to = new Date(item.cto);
          item.fromStamp = parseInt(from.getTime() / (1000 * 60 * 60 * 24));
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

        let result = [];
        res.data.forEach((item, index) => {
          let flg = false;
          if (index === 0) {
            result.push([res.data[0]]);
            return;
          }
          result.forEach((ritem, rindex) => {
            let find = _.find(ritem, {fromDateString: item.fromDateString});

            if (find) {
              result[rindex].unshift(item);
              flg = true;
            }
            if (result.length - 1 === rindex && !flg) {
              let arr = [item];
              result.push(arr);
            }
          });
        });

        this.total = res.total;
        this.defaultCourseList = this.defaultCourseList.concat(res.data);
        this.courseList = this.courseList.concat(result);
        // console.log(this.courseList);
        this.$wxUtils.loading({show: false});
      });
    },

    visitOrder (e) {
      this.$router.push({path: '/pages/account.packages/course.calendar/course.order', query: {id: e}});
    },

    visitCourseWaitPay () {
      this.$router.push('/pages/account.packages/course.calendar/course.waitpay');
    },

    visitCourseWaitAppra () {
      this.$router.push('/pages/account.packages/course.calendar/course.waitappr');
    },

    visitCourseHistory () {
      this.$router.push('/pages/account.packages/course.calendar/course.history');
    }
  },
  onReachBottom () {
    if (this.total > this.offset + this.limit) {
      this.offset = this.offset + this.limit;
      this.getOrderList();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .course-calendar-container {
    min-height: calc(100vh - 100rpx);
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
      width: 95%;
      padding: 28rpx 2.5%;
      text-align: center;
      background-color: #ffffff;
      color: #b9b9b9;
      border-top: 1rpx solid #efefef;
      box-shadow: 0 4rpx 8rpx #e8e8e8;
      @include flex(space-between, center);

      .footer-item {
        flex-basis: 33%;
        border-right: 1rpx solid #d4d4d4;

        &:last-child {
          border-right: 0;
        }
      }
    }
  }
</style>
