<template>
  <div class="teacher-container" @click="viewTeacherDetail">
    <div class="teacher-avatar">
      <img class="avatar-img" :src="detail.avartarurl" :mode="'aspectFill'" lazy-load>
    </div>
    <div class="teacher-inf">
      <div class="teacher-name flex-row-start ">
        <span class="teacher-name-text">{{detail.name}}</span>
        <hoo-auth v-if="detail.endorsed"></hoo-auth>
      </div>
      <div class="tearch-label">
        <hoo-label :type-text="this.detail.tags[0]" :label-arr="teacherLabelArr"></hoo-label>
      </div>
      <div class="teacher-education">{{detail.education}}</div>
      <div class="teacher-score" v-if="detail.star">
        <hoo-score :score="detail.star" :type="'show'"></hoo-score>
      </div>
    </div>
  </div>
</template>
<script>
  import hooLabel from '@/components/label';
  import hooAvatar from '@/components/avatar';
  import hooScore from '@/components/score';
  import hooAuth from '@/components/auth';
  export default {
    components: {
      hooLabel,
      hooAvatar,
      hooScore,
      hooAuth
    },
    props: ['detail'],
    data () {
      return {
      };
    },
    computed: {
      teacherLabelArr () {
        return this.detail.tags.slice(1);
      }
    },
    methods: {
      viewTeacherDetail () {
        this.$router.push({path: '/pages/teacher.packages/teacher.detail', query: {id: this.detail.id}});
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .teacher-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 40rpx;
    border-top: $searchItemTopBorder;

    .teacher-avatar {
      margin-right: 30rpx;
      flex-shrink: 0;

      .avatar-img {
        border-radius:20rpx;
        width: 140rpx;
        height: 140rpx;
      }
    }

    .teacher-inf {
      .teacher-name {
        .teacher-name-text {
          margin-right: 8rpx;
          font-size: 16px;
          color: $searchTitleColor;
          font-weight: bold;
        }
      }

      .teacher-label {
        margin-top: 10rpx;
      }

      .teacher-education {
        margin-top: 10rpx;
      }

      .teacher-score {
        margin-top: 20rpx;
      }
    }
  }
</style>

