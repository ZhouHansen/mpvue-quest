<template>
  <!-- 课程，活动，商品 -->
  <div class="section-detail-container">
    <img class="section-img" :src="params.coverfile" :mode="'widthFix'" />
    <!-- <div class="section-cover" v-if="params" :style="'background: url(' + params.coverfile + ') no-repeat 50% 50%; background-size: 100% auto;'"></div> -->
    <div class="section-title">
      <text class="section-title-text">{{params.name}}</text>
      <hoo-label :type-text="params.tagslist[0]" :label-arr="labelArr"></hoo-label>
      <div class="section-title-ctrl">
        <hoo-icon-button :type="'activity'" :person-num="params.favorcount" v-if="params.ltypes" :personNum="params.favorcount"></hoo-icon-button>
        <hoo-icon-button :type="'activity'" :person-num="params.favorcount" :join-text="'人想买'" v-if="!params.ltypes"></hoo-icon-button>
        <hoo-icon-button :type="params.favored === 0 ? 'collection' : 'collection_already'" :id="params.id" :subject="params.subject_type" @changeData="saveCollection"></hoo-icon-button>
        <hoo-icon-button :type="'share'"></hoo-icon-button>
      </div>
    </div>
    <div class="section-content">
      <hoo-left-border-title :title="'活动信息'"></hoo-left-border-title>
      <div class="section-content-arrange">
        <hoo-arrange :arrange-params="params"></hoo-arrange>
      </div>
      <!-- <div class="section-content-location" v-if="params.xlat && params.xlng">
        <hoo-location :data="distance" :name="params.name"></hoo-location>
      </div> -->
    </div>

    <div class="section-teacher" v-if="params.ltypes && params.teacherlist.length > 0">
      <hoo-left-border-title :title="'教师'"></hoo-left-border-title>
      <div class="teacher-list">
        <div class="teacher-item" v-for="item in params.teacherlist" :key="item" @click="visitTeacher(item.id)">
          <hoo-avatar :avatar="item.avartarurl"></hoo-avatar>
          <div class="teacher-name ellipsis">{{item.name}}</div>
          <div class="teacher-label" v-if="teacherDegree">
            <hoo-label :type-text="teacherDegree.text" :label-arr="item.tags" :type="'center'"></hoo-label>
          </div>
        </div>
      </div>
    </div>
    <div class="section-nav">
      <hoo-nav @tapNavItem="chooseNav" :unOnShowDefault="'true'" :tabs="tabData"></hoo-nav>

      <div class="section-nav-item">
        <div class="section-nav-detail" v-if="chooseNavIndex === '0'">
          <wx-parse :content="params.htmlabout"></wx-parse>
        </div>
        <div class="section-nav-appraise" v-if="chooseNavIndex === '1' && appraListData">
          <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
            <appra-list :params="appraListData"></appra-list>
          </scroll-view>
        </div>
      </div>
    </div>

    <div class="section-organi" v-if="params.instid !== 0">
      <left-border-title :title="'机构信息'"></left-border-title>
      <div class="section-organi-content">
        <hoo-organi :organi-data="params"></hoo-organi>
      </div>
    </div>
    <div class="section-order">
      <div class="go-to-order" :class="params.grouplist.length > 0 ? 'group' : 'un-group'" @click="goToOrder">
        <span v-if="params.price > 0">直接下单</span><span class="order-cost">{{params.price > 0?'¥' + params.price / 100 : '免费报名'}}</span>
      </div>
      <div class="group-order" @click="groupOrder" v-if="params.grouplist.length > 0"><span>拼团购买</span></div>
    </div>
    <group-order @chooseGroupType="sendGroupOrder" :params="params.grouplist"></group-order>
    <bind-phone></bind-phone>
  </div>
</template>
<script>
  import * as MutationType from '@/store/mutation.type';
  import wxParse from 'mpvue-wxparse';
  import Utils from '@/utils/index';
  import {TeacherDegreeData, GetDataObjUseId} from '@/utils/default.data';

  import hooLabel from '@/components/label';
  import hooIconButton from '@/components/have.icon.btn';
  import hooLeftBorderTitle from '@/components/left.border.title';
  import hooArrange from '@/components/arrange';
  import hooLocation from '@/module/discovery/section.location';
  import hooOrgani from '@/components/organization';
  import hooNav from '@/components/nav';
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
        },
        teacherDegree: null
      };
    },
    computed: {
      labelArr () {
        return this.params.tagslist.slice(1);
      }
    },
    onUnload () {
      this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: false, groupOrder: false});
    },
    mounted () {
      // console.log('活动数据', this.params);
      if (this.params.ltypes) {
        this.params['subject_type'] = 'lesson';
      } else {
        this.params['subject_type'] = 'product';
      }

      this.setTeacherInf();
    },
    methods: {
      setTeacherInf () {
        if (!this.params.teacherlist) {
          return;
        }

        this.params.teacherlist.forEach((item, index) => {
          if (item.degree) {
            this.teacherDegree = GetDataObjUseId(TeacherDegreeData, item.degree);
          }
        });
      },

      chooseNav (e) {
        // console.log('接收到点击的nav', e);
        this.chooseNavIndex = e;
        if (e === '1') {
          this.getAppraList();
        }
      },

      saveCollection (e) {
        if (e.collect === 'collection_already') {
          this.params.favored = 1;
        } else {
          this.params.favored = 0;
        }
      },

      goToOrder () {
        if (!this.$storage.get(this.$storageTypeName.userInf).cell) {
          // console.log(this.$storage.get(this.$storageTypeName.userInf).cell);
          this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, bindPhone: true});
          return;
        }

        if (!this.params.status) {
          this.$wxUtils.toast({title: '此活动已经停止'});
        }

        if (!this.params.ltypes) {
          this.$router.push('/pages/home/section.submit.order.book');
        } else {
          this.$router.push('/pages/home/section.submit.order');
        }
      },

      groupOrder () {
        if (!this.$storage.get(this.$storageTypeName.userInf).cell) {
          // console.log(this.$storage.get(this.$storageTypeName.userInf).cell);
          this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, bindPhone: true});
          return;
        }

        this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, groupOrder: true});
      },

      getAppraList () {
        let requestParams = {
          limit: this.appra.limit,
          offset: this.appra.offset
        };
        let requestType = 'lesson';

        if (!this.params.ltypes) {
          requestType = 'product';
        }
        this.$network.base.getCommentList(requestParams, null, 'weapp/comments/' + requestType + '/' + this.params.id).then(res => {
          // console.log('获取评价数据', res);
          if (!this.appraListData) {
            this.appraListData = [];
          }
          let result = Utils.filterRepeatData(this.appraListData, res.data);
          this.appraListData = this.appraListData.concat(result);
          this.appra.total = res.total;
        });
      },

      sendGroupOrder (e) {
        let order = {
          group: e,
          cb: () => {
            if (!this.params.ltypes) {
              this.$router.push('/pages/home/section.submit.order.book');
            } else {
              this.$router.push('/pages/home/section.submit.order');
            }
          }
        };

        this.$store.commit(MutationType.SET_ORDER_PARAMS, order);
      },

      loadMore () {
        if (this.chooseNavIndex === '1') {
          if (this.appra.total > this.appra.offset + this.appra.limit) {
            this.appra.offset = this.appra.offset + this.appra.limit;
            this.getAppraList();
          }
        }
      },

      visitTeacher (e) {
        this.$router.push({path: '/pages/teacher.packages/teacher.detail', query: {id: e}});
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import '../../assets/style/variables.scss';

  .section-detail-container {
    width: 100%;
    min-height: calc(100vh  - 7vh - 100rpx);
    padding-bottom: calc(100rpx + 7vh);

    .section-cover {
      width: 100vw;
      height: 50vw;
    }

    .section-img {
      width: 100%;
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

      .section-content-person {
        margin-left: 66rpx;
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
          overflow: hidden;

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }

    .section-organi {
      border-top: 20rpx solid #f9f9f9;
      margin: 40rpx;

      .section-organi-content {
        margin-top: 30rpx;
      }
    }

    .section-nav {
      border-top: 20rpx solid #f9f9f9;

      .section-nav-appraise scroll-view{
        max-height: calc(60vh - 110rpx);
      }
    }

    .section-nav-detail {
      padding: 0 20rpx;
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
