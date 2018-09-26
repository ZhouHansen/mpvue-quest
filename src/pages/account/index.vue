<template>
  <div class="account-container">
    <div class="account-header" @click="visitUserInf">
      <div class="account-header-left">
        <div class="account-avatar" :style="{background: 'url(' + avatar + ') no-repeat 50% 50%', backgroundSize: 'cover'}"></div>
        <div class="account-header-text">
          <div class="account-header-text-name">冯老师</div>
          <div class="account-header-text-unbind">未绑定手机号</div>
          <div class="account-header-text-phone">手机号：12312378791</div>
        </div>
      </div>
      <div class="account-arrow"></div>
    </div>
    <div class="section" @click="visitChildren">
      <div class="section-left">
        <div class="section-icon children"></div>
        <div class="section-text">
          <div class="section-text-title">孩子信息</div>
          <div>张海 男 8岁</div>
        </div>
      </div>
      <div class="account-arrow"></div>
    </div>
    <div class="section" @click="visitCourseCalendar">
      <div class="section-left">
        <div class="section-icon course"></div>
        <div class="section-text">
          <div class="section-text-title">课程日历</div>
          <div>共3节课</div>
        </div>
      </div>
      <div class="account-arrow"></div>
    </div>
    <div class="section" @click="visitPurchaseGoods">
      <div class="section-left">
        <div class="section-icon buy"></div>
        <div class="section-text">
          <div class="section-text-title">购买商品</div>
          <div>查看商品订单</div>
        </div>
      </div>
      <div class="account-arrow"></div>
    </div>
    <div class="section" @click="visitCollection">
      <div class="section-left">
        <div class="section-icon collection"></div>
        <div class="section-text">
          <div class="section-text-title">收藏</div>
          <div>查看收藏课程、老师、机构</div>
        </div>
      </div>
      <div class="account-arrow"></div>
    </div>
    <div class="section" @click="visitSetting">
      <div class="section-left">
        <div class="section-icon setting"></div>
        <div class="section-text">
          <div class="section-text-title">设置</div>
          <div>设置地址</div>
        </div>
      </div>
      <div class="account-arrow"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      avatar: 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_085134.462465.png'
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('我的');
  },
  methods: {
    visitUserInf () {
      this.$router.push('/pages/account.packages/user.inf');
    },

    visitChildren () {
      this.$router.push('/pages/account.packages/childrens');
    },

    visitCourseCalendar () {
      this.$router.push('/pages/account.packages/course.calendar');
    },

    visitPurchaseGoods () {
      this.$router.push('/pages/account.packages/purchase.goods');
    },

    visitCollection () {
      this.$router.push('/pages/account.packages/collection');
    },

    visitSetting () {
      this.$router.push('/pages/account.packages/setting');
    }
  }
};
</script>
<style lang="scss">
  @import '../../assets/style/variables.scss';

  .account-container {
    .account-header {
      @include flex();
      padding: 80rpx 40rpx;
      border-top: 1rpx solid #e8e8e8;

      .account-header-left {
        @include flex(flex-start);
        .account-avatar {
          width: 148rpx;
          height: 148rpx;
          border-radius: 100%;
          margin: 0 30rpx 0 40rpx;
        }

        .account-header-text-name {
          color: #000000;
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 10rpx;
        }

        .account-header-text-unbind {
          color: $topic-color;
        }
      }
    }

    .section {
      @include flex();
      padding: 40rpx;
      border-top: 1rpx solid #e8e8e8;

      .section-left {
        @include flex(flex-start);

        .section-icon {
          width: 90rpx;
          height: 90rpx;
          padding: 0 60rpx;
        }

        .children {
          @include backgroundImg('../../assets/images/children_inf_ic.png');
        }

        .course {
          @include backgroundImg('../../assets/images/course_date_ic.png');
        }

        .buy {
          @include backgroundImg('../../assets/images/buy_ic.png');
        }

        .collection {
          @include backgroundImg('../../assets/images/collection_ic.png');
        }

        .setting {
          @include backgroundImg('../../assets/images/setting_ic.png');
        }

        .section-text-title {
          font-size: 16px;
          color: #000000;
          font-weight: bold;
        }
      }
    }


    .account-arrow {
      width: 30rpx;
      height: 30rpx;
      @include backgroundImg('../../assets/images/arrow_right.png');
    }
  }
</style>
