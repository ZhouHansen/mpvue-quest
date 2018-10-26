<template>
  <div class="account-container">
    <div>
      <button :open-type="'getUserInfo'" :hover-stay-time="0" :hover-start-time="0" :lang="zh_CN" :plain="'true'" @getuserinfo="visitUserInfo">
        <div class="account-header">
            <div class="account-header-left">
              <img class="account-avatar" :src="avatar" :mode="'aspectFill'">
              <div class="account-header-text">
                <div class="account-header-text-name">{{name}}</div>
                <div class="account-header-text-unbind" v-if="!userInf.cell">未绑定手机号</div>
                <div class="account-header-text-phone" v-if="userInf.cell">手机号：{{userInf.cell}}</div>
              </div>
            </div>
            <div class="account-arrow"></div>
        </div>
      </button>
    </div>
    <div class="section" @click="visitChildren">
      <div class="section-left">
        <div class="section-icon children"></div>
        <div class="section-text">
          <div class="section-text-title">孩子信息</div>
          <div>{{children ? childrenText : '添加孩子信息'}}</div>
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
import Utils from '@/utils/index';
export default {
  data () {
    return {
      wxUserInf: this.$storage.get(this.$storageTypeName['wxUserInf']),
      userInf: this.$storage.get(this.$storageTypeName.userInf),
      avatar: '../../img/logo.png',
      name: '',
      children: null
    };
  },
  computed: {
    childrenText () {
      if (this.children) {
        let genderText = '';
        if (this.children.gender === 'F') {
          genderText = '男';
        } else {
          genderText = '女';
        }

        let age = parseInt(Utils.formatDateToPicker(new Date()).slice(0, 5)) - parseInt(this.children.birthday.slice(0, 5)) + 1;

        return this.children.name + ' ' + genderText + ' ' + age + '岁';
      }
    }
  },
  mounted () {
    this.$wxUtils.setNavTitle('我');
  },
  onShow () {
    this.getUserInf();
    this.getChildren();
  },
  methods: {
    getUserInf () {
      this.$network.account.getUserInf().then(res => {
        console.log('获取用户数据', res.data);
        this.userInf = res.data;
        this.$storage.set(this.$storageTypeName.userInf, res.data);
        this.setParams();
      });
    },

    getChildren () {
      this.$network.account.getChildrensList({limit: 1, offset: 0}).then(res => {
        console.log(res);
        if (res.data.length > 0) {
          this.children = res.data[0];
        }
      });
    },

    setParams () {
      if (this.userInf.avatar && this.userInf.avatar.indexOf('http') > -1) {
        this.avatar = this.userInf.avatar;
      } else {
        this.avatar = this.wxUserInf.avatarUrl;
      }

      if (this.userInf.decodednickname) {
        this.name = this.userInf.decodednickname;
      } else {
        this.name = this.wxUserInf.nickName;
      }
    },

    visitUserInfo (e) {
      if (!this.wxUserInf) {
        console.log(e);
        this.$storage.set(this.$storageTypeName.wxUserInf, e.mp.detail.userInfo);
      }

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
    button {
      font-size: 14px;
      box-sizing: normal;
      padding: 0;
      margin: 0;
      display: inline-block;
      width: 100%;
      line-height: normal;
      text-align: left;
      border: 0;
      background-color: #fff;
      outline: 0;
      box-shadow: 0;
      border-radius: 0;
    }
    .account-header {
      padding: 80rpx 40rpx;
      border-top: 1rpx solid #e8e8e8;
      @include flex();

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
