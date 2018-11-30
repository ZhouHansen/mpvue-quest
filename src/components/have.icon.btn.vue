<template>
  <div class="have-icon-btn-container">
    <span class="activity btn-item" v-if="type === 'activity'">
      <span class="icon hand"></span>
      <span>{{personNum === 0 ? '好多' : personNum}}{{joinText || '人想参加'}}</span>
    </span>
    <span class="collection btn-item" v-if="type === 'share'" @click="toogleActionSheet">
      <span class="icon share"></span>
      <span>分享</span>
    </span>
    <span class="collection btn-item" v-if="type === 'collection'" @click="setCollect">
      <span class="icon star"></span>
      <span>收藏</span>
    </span>
    <span class="collection btn-item" v-if="type === 'collection_already'" @click="cancelCollect">
      <span class="icon star_already"></span>
      <span>已收藏</span>
    </span>

    <hoo-action-sheet @hideasc="toogleActionSheet" :params="{type: 'share'}" v-if="showActions"></hoo-action-sheet>
  </div>
</template>
<script>

import hooActionSheet from '@/components/action.sheet';
export default {
  props: ['type', 'personNum', 'joinText', 'id', 'subject', 'favoid'], // subject 要收藏的类型，课程、商品、机构、老师
  components: {
    hooActionSheet
  },
  data () {
    return {
      showActions: false
    };
  },
  onHide () {
    this.showActions = false;
  },
  methods: {
    setCollect () {
      this.$network.base.setCollection({}, null, 'weapp/favor/' + this.subject + '/' + this.id).then(res => {
        // console.log(res);

        if (res.e === 0) {
          this.$wxUtils.toast({title: '收藏成功'});
        } else {
          this.$wxUtils.toast({title: res.msg, icon: 'none'});
        }
        this.type = 'collection_already';
        this.$emit('changeData', {collect: this.type});
      });
    },

    cancelCollect () {
      this.$network.base.cancelCollection({}, null, 'weapp/favor/del/' + this.favoid).then(res => {
        if (res.e === 0) {
          this.$wxUtils.toast({title: '取消收藏'});
        } else {
          this.$wxUtils.toast({title: res.msg, icon: 'none'});
        }
        this.type = 'collection';
        this.$emit('changeData', {collect: this.type});
      });
    },

    toogleActionSheet () {
      this.showActions = !this.showActions;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .have-icon-btn-container {
    .btn-item {
      @include flex(space-between);
      padding: 10rpx 20rpx;
      border-radius: 42rpx;
      border: 1rpx solid $topic-color;
      color: $topic-color;

      button {
        @include flex(space-between);
        color: $topic-color;

      }

      .icon {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
        flex-shrink: 0;
      }

      .hand {
        @include backgroundImg('../assets/images/hand.png');
      }

      .hand_already {
        @include backgroundImg('../assets/images/ic_hand_green.png');
      }



      .star {
        @include backgroundImg('../assets/images/star.png');
      }

      .star_already {
        @include backgroundImg('../assets/images/ic_cllect_green.png');
      }

      .share {
        @include backgroundImg('../assets/images/share.png');
      }
    }
  }
</style>
