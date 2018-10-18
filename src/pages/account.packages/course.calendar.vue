<template>
  <div class="course-calendar-container">
    <div class="date-list">
      <div class="date-item">
        <div class="date-title">
          <hoo-have-left-border-title :title="'今天（7月1日）'"></hoo-have-left-border-title>
        </div>
        <div class="date-total">共3节课</div>
        <div class="course-list">
          <div class="course-item" v-for="item in courseList" :key="item.id" @click="visitOrder(item.id)">
            <div class="course-item-time">10:30-12:00</div>
            <div class="course-item-name ellipsis">{{item.product ? item.product.name: ''}}</div>
            <div class="course-item-visit">
              <span>查看</span>
              <span class="course-item-visit-icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" @click="visitCourseHistory">
      <span>查看历史课程</span>
      <span class="footer-icon"></span>
    </div>
    <hoo-empty :text="'~还没有课程信息~'" :type="'normal'" v-if="courseList.length === 0"></hoo-empty>
  </div>
</template>
<script>
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
      courseList: []
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('课程日历');
    this.getOrderList();
  },
  methods: {
    getOrderList () {
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.account.getCourseList().then(res => {
        console.log(res);
        this.courseList = res.data;
        this.$wxUtils.loading({show: false});
      });
    },

    visitOrder (e) {
      let result = this.courseList.filter((item, index) => {
        return e === item.id;
      });

      this.$router.push({path: '/pages/account.packages/course.calendar/course.order', query: {obj: JSON.stringify(result[0])}});
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
        margin-top: 30rpx;

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
