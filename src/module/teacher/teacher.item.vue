<template>
  <div class="teacher-container" @click="viewTeacherDetail">
    <div class="teacher-avatar">
      <hoo-avatar :avatar="params.avatarurl"></hoo-avatar>
    </div>
    <div class="teacher-inf">
      <div class="teacher-name flex-row-start ">
        <span class="teacher-name-text">{{params.name}}</span>
        <hoo-auth v-if="params.endorsed"></hoo-auth>
      </div>
      <div class="tearch-label">
        <hoo-label :type-text="teacherLabelTypeText" :label-arr="teacherLabelArr"></hoo-label>
      </div>
      <div class="teacher-education">{{params.education}}</div>
      <div class="teacher-score">
        <hoo-score :score="params.star" :type="'show'"></hoo-score>
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
    props: ['params'],
    data () {
      return {
        teacherLabelTypeText: this.params.subjectslist,
        teacherLabelArr: this.params.tagslist
      };
    },
    methods: {
      viewTeacherDetail () {
        this.$router.push({path: '/pages/teacher.packages/teacher.detail', query: {id: this.params.id}});
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
    }

    .teacher-inf {
      .teacher-name {
        .teacher-name-text {
          margin-right: 8rpx;
          font-size: 16px;
          color: $searchTitleColor;
          font-weight: bold;
        }

        // .teacher-auth {
        //   display: inline-block;
        //   font-size: 12px;
        //   color: $topic-color;

        //   .teacher-auth-icon {
        //     background: url('../../assets/images/check-circle-fill.png') no-repeat 50% 50%;
        //     background-size: contain;
        //     display: inline-block;
        //     width: 28rpx;
        //     height: 28rpx;
        //     vertical-align:text-top;
        //   }

        //   .teacher-auth-text {
        //     vertical-align:middle;
        //   }
        // }
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

