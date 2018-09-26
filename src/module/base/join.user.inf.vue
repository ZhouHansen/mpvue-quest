<template>
  <div class="json-user-container">
      <div class="parent">
        <div class="user-title">家长信息</div>
        <div class="parent-inf">
          <span class="parent-name">孙俪</span>
          <span class="parent-phone">13304482010</span>
        </div>
      </div>
      <div class="child">
        <div class="user-title">孩子信息</div>
        <div class="child-section">
          <div class="child-inf">
            <span class="child-name">张爱玲</span>
            <span class="child-icon man"></span>
          </div>
          <div class="child-ctrl" v-if="type === 'edit'" @click="editChild(2)"></div>
        </div>
        <div class="child-add" @click="editChild" v-if="type === 'edit'">
          <span>添加</span>
          <span class="child-add-icon"></span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: ['type'], // 'edit or unedit',
  methods: {
    editChild (e) {
      if (e) {
        this.$router.push({path: '/pages/account.packages/childrens.add', query: {id: e}});
      } else {
        this.$router.push('/pages/account.packages/childrens.add');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';
  .user-detail {
      .json-user-container {
        padding-left: 26rpx;

        .user-title {
          font-size: 18px;
          color: #000000;
          font-weight: bold;
        }
        .parent {
          margin-top: 30rpx;
          padding-bottom: 30rpx;

          .parent-inf {
            margin-top: 12rpx;

            .parent-name {
              margin-right: 30rpx;
            }
          }
        }
        .child {
          padding-top: 30rpx;
          border-top: 1rpx solid #efefef;

          .child-section {
            margin-top: 12rpx;
            @include flex();

            .child-name {
              margin-right: 10rpx;
            }

            .child-icon {
              width: 22rpx;
              height: 22rpx;
              display:inline-block;
            }

            .man {
              @include backgroundImg('../../assets/images/man.png');
            }

            .woman {
              @include backgroundImg('../../assets/images/woman.png');
            }

            .child-ctrl {
              @include backgroundImg('../../assets/images/write.png');
              width: 32rpx;
              height: 32rpx;
            }
          }

          .child-add {
            margin-top: 30rpx;
            color: $orange-color;
            @include flex();

            .child-add-icon {
              @include backgroundImg('../../assets/images/icon_add_child.png');
              width: 32rpx;
              height: 32rpx;
            }
          }
        }
      }
    }
</style>
