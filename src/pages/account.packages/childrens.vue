<template>
  <div class="children-container">
    <div class="children-list" v-if="childrenList.length > 0">
      <div class="children-item">
        <div class="item-left">
          <div class="child-name">张力</div>
          <div class="child-inf">
            <span class="child-gender">男孩</span>
            <span class="child-id">2931523412431237</span>
          </div>
        </div>
        <div class="item-right" @click="editChildrenInf(1)">
          <span class="edit-child"></span>
        </div>
      </div>
      <div class="children-item">
        <div class="item-left">
          <div class="child-name">张力</div>
          <div class="child-inf">
            <span class="child-gender">男孩</span>
            <span class="child-id">2931523412431237</span>
          </div>
        </div>
        <div class="item-right" @click="editChildrenInf(2)">
          <span class="edit-child"></span>
        </div>
      </div>
    </div>
    <div class="add-childrebn" @click="editChildrenInf()">添加孩子信息</div>
    <div class="children-empty" v-if="childrenList.length === 0">
      <img src="../../assets/images/ic_empty.png" :mode="'aseptFill'" class="empty-icon">
      <div class="empty-text">～还没有添加孩子信息～</div>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      childrenList: [
        {id: 1}
      ]
    };
  },
  methods: {
    editChildrenInf (e) {
      if (e) {
        this.$router.push({path: '/pages/account.packages/childrens.add', query: {id: '123123'}});
      } else {
        this.$router.push({path: '/pages/account.packages/childrens.add'});
      }
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

      .children-item {
        @include flex();
        padding: 40rpx;
        background-color: #ffffff;
        border-top: 1rpx solid #f1f1f1;
        box-shadow: 0 4rpx 8rpx #e8e8e8;

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
    }

    .add-childrebn {
      padding: 26rpx 0;
      text-align: center;
      font-size: 16px;
      color: $orange-color;
      background-color: #ffffff;
      border-top: 1rpx solid #ededed;
    }

    .children-empty {
      text-align: center;
      margin-top: 200rpx;

      .empty-icon {
        width: 424rpx;
        height: 276rpx;
      }

      .empty-text {
        font-size: 16px;
        color: #9f9f9f;
        margin-top: 40rpx;
      }
    }
  }
</style>
