<template>
  <div class="children-container">
    <div class="children-list" v-if="childrenList.length > 0">
      <div class="children-body" v-for="item in childrenList" :key="item.id">
        <div class="children-item" :id="item.id"
          @touchmove="touchmoveItem"
          @touchstart="touchstartItem"
          @touchend="touchendItem"
          :style="touchId === item.id + '' ? deleteSlider : ''">
          <div class="item-left">
            <div class="child-name">{{item.name}}</div>
            <div class="child-inf">
              <span class="child-gender">{{item.gender === 'F' ? '男' : '女'}}</span>
              <span class="child-id">{{item.ssn}}</span>
            </div>
          </div>
          <div class="item-right" @click="editChildrenInf(item.id)">
            <span class="edit-child"></span>
          </div>
        </div>
        <div class="delete-item" @click="deleteItem(item.id)">删除</div>
      </div>
    </div>
    <div class="add-childrebn" @click="editChildrenInf()">添加孩子信息</div>
    <hoo-empty :text="'～还没有添加孩子信息～'" :type="'normal'" v-if="childrenList.length === 0"></hoo-empty>
  </div>
</template>
<script>
import hooEmpty from '@/components/empty';

export default {
  components: {
    hooEmpty
  },
  props: [],
  data () {
    return {
      childrenList: [
      ],

      touchId: null,
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '' // 滑动时的效果
    };
  },
  onShow () {
    this.$wxUtils.loading({title: '加载中...'});
    this.getChildrenList();
  },
  methods: {
    getChildrenList () {
      this.$network.account.getChildrensList().then(res => {
        console.log(res);
        this.$wxUtils.loading({show: false});
        this.childrenList = res.data;
      });
    },

    editChildrenInf (e) {
      if (e) {
        let result = this.childrenList.filter((item, index) => {
          return item.id === e;
        });
        this.$router.push({path: '/pages/account.packages/childrens.add', query: {id: e, obj: JSON.stringify(result[0])}});
      } else {
        this.$router.push({path: '/pages/account.packages/childrens.add'});
      }
    },

    touchstartItem (e) {
      if (e.mp.touches.length === 1) {
        // 记录开始位置
        this.touchId = e.mp.currentTarget.id;
        this.startX = e.mp.touches[0].clientX;
      }
    },

    touchmoveItem (e) {
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = 80;
      if (e.mp.touches.length === 1) {
        this.touchId = e.mp.currentTarget.id;
        // 滑动时距离浏览器左侧实时距离
        this.moveX = e.mp.touches[0].clientX;

        // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX === 0) {
          this.deleteSlider = 'transform:translateX(0px)';
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = 'transform:translateX(-' + this.disX * 5 + 'px)';

          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = 'transform:translateX(-' + wd + 'px)';
          }
        }
      }
    },

    touchendItem (e) {
      let wd = 80;
      if (e.mp.changedTouches.length === 1) {
        this.touchId = e.mp.currentTarget.id;
        let endX = e.mp.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        // console.log(this.disX);
        // 如果距离小于删除按钮一半,强行回到起点
        if ((this.disX * 5) < (wd / 2)) {
          this.deleteSlider = 'transform:translateX(0px)';
        } else {
          // 大于一半 滑动到最大值
          this.deleteSlider = 'transform:translateX(-' + wd + 'px)';
        }
      }
    },

    deleteItem (e) {
      // console.log(e);
      let result = this.childrenList.filter((item, index) => {
        return item.id === e;
      });

      this.$wxUtils.showModal({title: '确定删除' + result[0].name + '？'}).then(res => {
        this.$network.account.deleteChildrenInf({}, null, 'weapp/child/' + e).then(res => {
          if (res.e === 0) {
            this.$wxUtils.toast({title: '删除成功'});
            this.getChildrenList();
          } else {
            this.$wxUtils.toast({title: '删除失败，请重试'});
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .children-container {
    min-height: 100vh;
    background-color: #f9f9f9;

    .children-list {
      margin-bottom: 10rpx;

      .children-body {
        position: relative;
        height: 180rpx;
        border-top: 1rpx solid #f1f1f1;
      }

      .children-item {
        @include flex();
        padding: 40rpx;
        background-color: #ffffff;
        box-shadow: 0 4rpx 8rpx #e8e8e8;
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        bottom: 0;
        transition: 0.3s;
        z-index: 1;

        .item-left {
          .child-name {
            color: #000000;
            font-size: 18px;
          }

          .child-id {
            color: #bababa;
            margin-top: 10rpx;
            margin-left: 30rpx;
          }
        }

        .item-right {
          border-left: 1rpx solid #ececec;
          padding: 18rpx 0 18rpx 40rpx;
          flex-shrink: 0;

          .edit-child {
            @include backgroundImg('../../assets/images/write.png');
            width: 32rpx;
            height: 32rpx;
            display: inline-block;
            vertical-align:middle;
          }
        }
      }

      .delete-item {
        position: absolute;
        top: 0;
        right: 0;
        width: 160rpx;
        height: 100%;
        background-color: #ff6363;
        color: #ffffff;
        font-size: 18px;
        line-height: 180rpx;
        text-align: center;
      }
    }

    .add-childrebn {
      padding: 26rpx 0;
      text-align: center;
      font-size: 16px;
      color: $orange-color;
      background-color: #ffffff;
      border-top: 1rpx solid #ededed;
    }
  }
</style>
