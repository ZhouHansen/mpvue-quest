<template>
  <!-- 课程，活动，商品 -->
  <div class="section-detail-container">
    <div class="section-cover" :style="'background: url(' + params.coverfile + ') no-repeat 50% 50%; background-size: cover;'"></div>
    <div class="section-title">
      <div class="section-title-text ellipsis">{{params.name}}</div>
      <hoo-label :type-text="params.tagslist[0]" :label-arr="labelArr"></hoo-label>
      <div class="section-title-ctrl">
        <hoo-icon-button :type="'activity'" :person-num="params.favorcount" v-if="params.ltype" :personNum="params.favorcount"></hoo-icon-button>
        <hoo-icon-button :type="'activity'" :person-num="params.favorcount" :join-text="'人想买'" v-if="!params.ltype"></hoo-icon-button>
        <hoo-icon-button :type="params.favored === 0 ? 'collection' : 'collection_already'" :id="params.id" :subject="params.subject_type"></hoo-icon-button>
        <hoo-icon-button :type="'share'"></hoo-icon-button>
      </div>
    </div>
    <div class="section-content">
      <hoo-left-border-title :title="'活动信息'"></hoo-left-border-title>
      <div class="section-content-arrange">
        <hoo-arrange :arrange-params="params"></hoo-arrange>
      </div>
      <div class="section-content-location" v-if="params.xlat && params.xlng">
        <hoo-location :data="distance"></hoo-location>
      </div>
    </div>

    <div class="section-teacher">
      <hoo-left-border-title :title="'参与教师'"></hoo-left-border-title>
      <div class="teacher-list">
        <div class="teacher-item">
          <hoo-avatar></hoo-avatar>
          <div class="teacher-name">老师姓名</div>
          <div class="teacher-label">
            <hoo-label :type-text="'测试'" :label-arr="labelArr" :type="'center'"></hoo-label>
          </div>
        </div>
        <div class="teacher-item">
          <hoo-avatar></hoo-avatar>
          <div class="teacher-name">老师姓名</div>
          <hoo-label :type-text="'测试'" :label-arr="labelArr" :type="'center'"></hoo-label>
        </div>
        <div class="teacher-item">
          <hoo-avatar></hoo-avatar>
          <div class="teacher-name">老师姓名</div>
          <hoo-label :type-text="'测试'" :label-arr="labelArr" :type="'center'"></hoo-label>
        </div>
        <div class="teacher-item">
          <hoo-avatar></hoo-avatar>
          <div class="teacher-name">老师姓名</div>
          <hoo-label :type-text="'测试'" :label-arr="labelArr" :type="'center'"></hoo-label>
        </div>
      </div>
    </div>

    <div class="section-organi" v-if="params.instid !== 0">
      <left-border-title :title="'机构信息'"></left-border-title>
      <div class="section-organi-content">
        <hoo-organi :organi-data="params"></hoo-organi>
      </div>
    </div>
    <div class="section-nav">
      <hoo-nav @tapNavItem="chooseNav" :unOnShowDefault="'true'" :tabs="tabData"></hoo-nav>

      <div class="section-nav-item">
        <div class="section-nav-detail" v-if="chooseNavIndex === '0'">
          <wx-parse :content="params.htmlabout"></wx-parse>
        </div>
        <div class="section-nav-appraise" v-if="chooseNavIndex === '1' && appraListData">
          <appra-list :params="appraListData"></appra-list>
        </div>
      </div>
    </div>
    <div class="section-order">
      <div class="go-to-order" :class="params.grouplist.length > 0 ? 'group' : 'un-group'" @click="goToOrder"><span>直接下单</span><span class="order-cost">¥{{params.price / 100}}</span></div>
      <div class="group-order" @click="groupOrder" v-if="params.grouplist.length > 0"><span>拼团购买</span></div>
    </div>
    <group-order @chooseGroupType="sendGroupOrder" :params="params.grouplist"></group-order>
    <bind-phone></bind-phone>
    <hoo-feedback :text="'评价成功'"></hoo-feedback>
  </div>
</template>
<script>
  import * as MutationType from '@/store/mutation.type';
  import wxParse from 'mpvue-wxparse';
  import Utils from '@/utils/index';

  import hooLabel from '@/components/label';
  import hooIconButton from '@/components/have.icon.btn';
  import hooLeftBorderTitle from '@/components/left.border.title';
  import hooArrange from '@/components/arrange';
  import hooLocation from '@/module/discovery/section.location';
  import hooOrgani from '@/components/organization';
  import hooNav from '@/components/nav';
  import hooFeedback from '@/components/feedback';
  import hooAvatar from '@/components/avatar';

  import appraList from '@/module/base/appraisal/appraisal.list';
  import groupOrder from '@/module/discovery/section.detail.group.order';
  import bindPhone from '@/module/base/bindphone/bindphone';
  export default {
    components: {
      wxParse,
      hooLabel,
      hooIconButton,
      hooLeftBorderTitle,
      hooArrange,
      hooAvatar,
      hooLocation,
      hooOrgani,
      hooNav,
      hooFeedback,
      appraList,
      groupOrder,
      bindPhone
    },
    props: ['params'],
    data () {
      return {
        tabData: ['详情', '评价'],
        chooseNavIndex: '0',
        appraListData: null,

        distance: {
          lat: this.params.xlat,
          lng: this.params.xlng,
          address: this.params.address
        },

        appra: {
          limit: 15,
          offset: 0,
          total: 0
        }
      };
    },
    computed: {
      labelArr () {
        return this.params.tagslist.slice(1);
      }
    },
    onShow () {
      // this.chooseNavIndex = '0';
    },
    mounted () {
      console.log('活动数据', this.params);
      if (this.params.ltype) {
        this.params['subject_type'] = 'lesson';
      } else {
        this.params['subject_type'] = 'product';
      }
    },
    methods: {
      chooseNav (e) {
        // console.log('接收到点击的nav', e);
        this.chooseNavIndex = e;
        if (e === '1') {
          this.getAppraList();
        }
      },

      goToOrder () {
        if (!this.params.ltype) {
          this.$router.push('/pages/home/section.submit.order.book');
        } else {
          this.$router.push('/pages/home/section.submit.order');
        }
      },

      groupOrder () {
        // this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, bindPhone: true});
        this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, groupOrder: true});
      },

      getAppraList () {
        let requestParams = {
          limit: this.appra.limit,
          offset: this.appra.offset
        };
        let requestType = 'lesson';

        if (!this.params.ltype) {
          requestType = 'product';
        }
        this.$network.base.getCommentList(requestParams, null, 'weapp/comments/' + requestType + '/' + this.params.id).then(res => {
          console.log('获取评价数据', res);
          this.appraListData = Utils.filterRepeatData(this.appraListData, res.data);
          this.appra.total = res.total;
        });
      },

      sendGroupOrder (e) {
        if (!this.params.ltype) {
          this.$router.push('/pages/home/section.submit.order.book');
        } else {
          let order = {
            group: e
          };

          this.$store.commit(MutationType.SET_ORDER_PARAMS, order);
          this.$router.push({path: '/pages/home/section.submit.order'});
        }
      }
    },
    onReachBottom () {
      if (this.chooseNavIndex === '1') {
        if (this.appra.total > this.appra.offset + this.appra.limit) {
          this.appra.offset = this.appra.offset + this.appra.limit;
          this.getAppraList();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import '../../assets/style/variables.scss';

  .section-detail-container {
    width: 100%;
    min-height: 100vh;

    .section-cover {
      width: 100%;
      height: 25vh;
    }

    .section-title {
      margin: 20rpx 40rpx 0;
      background-color: #fff;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 20rpx #d4d4d4;
      padding: 40rpx;

      .section-title-text {
        font-size:18px;
        color: #46311e;
      }

      .section-title-ctrl {
        @include flex(space-around);
        margin-top: 20rpx;
      }
    }

    .section-content {
      padding: 40rpx;

      .section-content-arrange {
        margin-left: 20rpx;
        padding-bottom: 30rpx;
      }

      .section-content-location {
        margin-left: 20rpx;
        padding-top: 30rpx;
        border-top: 1rpx solid #efefef;
      }
    }

    .section-teacher {
      padding: 40rpx;

      .teacher-list {
        @include flex(flex-start, center, row wrap);

        .teacher-item {
          flex-basis: calc(30% - 12rpx);
          margin-right: calc(4% - 3rpx);
          border: 1rpx dashed #dfdfdf;
          text-align: center;
          margin-top: 20rpx;
          padding: 10rpx 6rpx;


          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }

    .section-organi {
      border-top: 20rpx solid #f9f9f9;
      padding: 40rpx;

      .section-organi-content {
        margin-top: 30rpx;
      }
    }

    .section-nav {
      border-top: 20rpx solid #f9f9f9;
      margin-bottom: 15vh;
    }

    .section-order {
      position: fixed;
      bottom: 60rpx;
      left: 40rpx;
      width: calc(100vw - 80rpx);
      border-radius: 49rpx;
      overflow: hidden;
      color: #ffffff;
      text-align: center;
      height: 7vh;
      line-height: 7vh;
      z-index: 599;
      @include flex(space-between);

      .go-to-order {
        background-color: $topic-color;
        font-size: 13px;
        height: 100%;

        .order-cost {
          font-size: 18px;
          margin-left: 12rpx;
          font-weight: bold;
        }
      }

      .group {
        flex-basis: 66%;
      }

      .un-group {
        flex-basis: 100%;
      }

      .group-order {
        font-size: 13px;
        flex-basis: 34%;
        height: 100%;
        background-color: #26C925;

        span {
          display:inline-block;
          margin-top:4rpx;
        }
      }
    }
  }
</style>
