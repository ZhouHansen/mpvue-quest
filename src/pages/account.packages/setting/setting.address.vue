<template>
  <div class="setting-address-container">
    <div class="address-list"  v-if="addressList.length !== 0">
      <div class="address-item" v-for="item in addressList" :key="item.id">
        <div class="address-item-body"
          :id="item.id"
          @touchmove="touchmoveItem"
          @touchstart="touchstartItem"
          @touchend="touchendItem"
          :style="touchId === item.id + ''?deleteSlider: ''"
        >
          <div class="address-item-content">
            <div class="address-item-title">{{item.prov}}{{item.city}}{{item.district}}</div>
            <div class="address-item-detail">
              <span class="address-item-name">{{item.name}}</span>
              <span class="address-item-phone">{{item.cell}}</span>
              <span class="address-item-default" v-if="item.prim">默认</span>
            </div>
          </div>
          <div class="address-item-ctrl" @click="editAddress(item.id)">
            <span class="address-item-icon"></span>
          </div>
        </div>
        <div class="address-item-delete" @click="deleteItem(item.id)">删除</div>
      </div>
    </div>
    <div class="add-address" @click="editAddress">添加地址</div>
    <hoo-empty :text="'～还没有地址～'" :type="'normal'" v-if="addressList.length === 0"></hoo-empty>
  </div>
</template>
<script>
import hooEmpty from '@/components/empty';

export default {
  components: {
    hooEmpty
  },
  props: [''],
  data () {
    return {
      addressList: [],

      touchId: null,
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '' // 滑动时的效果
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('地址列表');
  },
  onShow () {
    this.getAddressList();
  },
  methods: {
    getAddressList () {
      this.$wxUtils.loading({title: '加载中...'});
      this.$network.account.getAddressList().then(res => {
        // console.log(res);
        this.$wxUtils.loading({show: false});
        this.addressList = res.data;
      });
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
        // console.log(this.disX);
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
      console.log(e);
      let result = this.addressList.filter((item, index) => {
        return item.id === e;
      });

      this.$wxUtils.showModal({title: '确定删除' + result[0].name + '？'}).then(res => {
        if (res) {
          this.$network.account.deleteAddressInf({}, null, 'weapp/address/' + e).then(res => {
            this.$wxUtils.toast({title: '删除成功'});
            this.getAddressList();
          });
        }
      });
    },

    editAddress (e) {
      if (e) {
        let result = this.addressList.filter((item, index) => {
          return item.id === e;
        });

        this.$router.push({path: '/pages/account.packages/setting/setting.address.add', query: {id: e, obj: JSON.stringify(result[0])}});
      } else {
        this.$router.push('/pages/account.packages/setting/setting.address.add');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .setting-address-container {
    background-color: #f9f9f9;
    min-height: 100vh;

    .add-address {
      background-color: #ffffff;
      color: $orange-color;
      padding: 26rpx 0;
      font-size: 16px;
      margin-top: 20rpx;
      border: 1rpx solid #ededed;
      text-align: center;
    }

    .address-list {
      .address-item {
        position: relative;
        box-shadow: 0 4rpx 8rpx #e8e8e8;
        border-top: 1rpx solid #f1f1f1;
        height: 180rpx;

        .address-item-body {
          background-color: #ffffff;
          padding: 40rpx;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          transition: 0.3s;
          @include flex();

          .address-item-content {
            .address-item-title {
              font-size: 18px;
              font-weight: bold;
              color: #000000;
            }

            .address-item-phone {
              color: #bababa;
              padding: 0 30rpx;
            }

            .address-item-default {
              color: $topic-color;
            }
          }

          .address-item-ctrl {
            flex-shrink: 0;
            padding: 22rpx 0 22rpx 40rpx;
            text-align: center;
            border-left: 1rpx solid #ececec;

            .address-item-icon {
              display: inline-block;
              width: 32rpx;
              height: 32rpx;
              @include backgroundImg('../../../assets/images/write.png');
            }
          }
        }

        .address-item-delete {
          position: absolute;
          right: 0;
          top: 0;
          text-align: center;
          font-size: 18px;
          color: #ffffff;
          line-height: 180rpx;
          background-color: #FF6363;
          width: 160rpx;
        }
      }
    }
  }
</style>
