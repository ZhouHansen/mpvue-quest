<template>
  <div class="course-appraisal-container">
    <div class="course-body section">
      <hoo-have-left-border-title :title="'课程评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'courseScore'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="courseInput" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'courseImageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>

    <div class="teacher-body section">
      <hoo-have-left-border-title :title="'老师评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'teacherScore'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="teacherInput" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'teacherImageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>

    <div class="organi-body section">
      <hoo-have-left-border-title :title="'机构评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'organiScore'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="organiInput" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'organiImageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>
    <div class="footer">
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
  </div>
</template>
<script>
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooScore from '@/components/score';
import hooImageAppraisal from '@/components/image.appraisal';
import hooButton from '@/components/button';

export default {
  props: [''],
  components: {
    hooHaveLeftBorderTitle,
    hooScore,
    hooImageAppraisal,
    hooButton
  },
  data () {
    return {
      score: 3.2,
      courseInput: '',
      courseImageList: [],
      courseScore: 1,
      teacherInput: '',
      teacherImageList: [],
      teacherScore: 1,
      organiInput: '',
      organiImageList: [],
      organiScore: 1
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('评价');
  },
  methods: {
    getImageData (e) {
      this[e.id] = e.imageList;
    },

    appraisalDesc (e) {
      this[e.mp.target.id] = e.mp.detail.value;
    },

    getScore (e) {
      this[e.id] = e.score;
    },

    submit () {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .course-appraisal-container {
    background-color:  #f9f9f9;

    .section {
      background-color:  #ffffff;
      padding: 40rpx;
      margin-top: 20rpx;
      border: 1rpx solid #efefef;

      &:first-child {
        margin-top: 0;
      }

      .section-score {
        @include flex();
        margin-top: 30rpx;
      }

      .section-input {
        @include flex(space-between, flex-start);
        margin-top: 30rpx;
      }

      .section-images {
        @include flex();
        margin-top: 30rpx;
      }

      .label {
        flex-basis: calc(30vw - 48rpx);
        flex-shrink: 0;
        margin-left: 20rpx;
        color: #bfbfbf;
        font-size: 16px;
      }

      .score-com,
      .input-com,
      .image-com {
        flex-basis: 100%;
      }

      .input-com {
        textarea {
          width: calc(100% - 48rpx);
          height: 160rpx;
          padding: 24rpx;
          border: 1rpx solid #e3e3e3;
          background-color: #fbfbfb;
          border-radius: 16rpx;
        }
      }
    }

    .footer {
      padding: 40rpx;
    }
  }
</style>
