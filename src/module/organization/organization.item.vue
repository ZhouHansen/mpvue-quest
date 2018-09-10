<template>
  <div class="organi-container">
    <div class="organi-avatar">
      <hoo-avatar></hoo-avatar>
    </div>
    <div class="organi-inf">
      <div class="organi-title">娱乐网</div>
      <div class="organi-desc line-clamp-3">寓乐湾成立以来已获得27项机器人、创客类寓乐湾成立以来已获得27项机器人、创客类寓乐湾成立以来已获得27项机器人、创客类寓乐湾成立以来已获得27项机器人、创客类</div>

      <!-- 显示可选的 -->
      <div class="organi-total">
        <div class="organi-total-type">
          <span class="organi-total-num">52</span>
          <span>老师</span>
        </div>
        <div class="organi-total-type">
          <span class="organi-total-num">52</span>
          <span>课程</span>
        </div>
      </div>

      <!-- 收藏 分享 -->
    </div>
  </div>
</template>
<script>
  import hooAvatar from '@/components/avatar';

  export default {
    props: ['organData'],
    components: {
      hooAvatar
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .organi-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    border-top: $searchItemTopBorder;
    padding: 40rpx;

    .organi-avatar {
      flex-shrink: 0;
      margin-right: 40rpx;
    }

    .organi-inf {

      .organi-title {
        font-size: 18px;
        color: $searchTitleColor;
      }

      .organi-desc {
        color: #9f9f9f;
        margin-top: 12rpx;
      }

      .organi-total {
        margin-top: 24rpx;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .organi-total-type {
          border: 1rpx solid #dfdfdf;
          border-radius: 42rpx;
          padding: 14rpx 0;
          width: 45%;
          text-align: center;
          color: #9f9f9f;

          .organi-total-num {
            color:#454545;
            margin-right:5%;
          }
        }
      }
    }
  }
</style>
