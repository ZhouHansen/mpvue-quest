<template>
  <div class="course-appraisal-container">
    <div class="course-body section">
      <hoo-have-left-border-title :title="'课程评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'lesson.score'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="lesson.input" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'lesson.imageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>

    <div class="teacher-body section">
      <hoo-have-left-border-title :title="'老师评价'"></hoo-have-left-border-title>
      <div class="section-picker" v-if="teacherList.length > 1">
        <picker @change="bindTeacherChange" :value="teacherValue" :range-key="'text'" :range="teacherList">
          <div class="section-picker-body">
            <span class="section-picker-title">评价老师</span>
            <span class="section-picker-text">
              {{teacherList[teacherValue].text}}
              <span class="section-picker-icon">(点击选择)</span>
            </span>
          </div>
        </picker>
      </div>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'teacher.score'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="teacher.input" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'teacher.imageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>

    <div class="organi-body section">
      <hoo-have-left-border-title :title="'机构评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'institution.score'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="institution.input" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'institution.imageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>
    <div class="footer">
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
    <hoo-feedback :text="'评价成功'"></hoo-feedback>
  </div>
</template>
<script>
import * as MutationType from '@/store/mutation.type';
import hooHaveLeftBorderTitle from '@/components/left.border.title';
import hooScore from '@/components/score';
import hooImageAppraisal from '@/components/image.appraisal';
import hooButton from '@/components/button';
import hooFeedback from '@/components/feedback';

export default {
  components: {
    hooHaveLeftBorderTitle,
    hooScore,
    hooImageAppraisal,
    hooButton,
    hooFeedback
  },
  data () {
    return {
      teacherList: [],
      teacherValue: 0,
      lesson: {
        type: 'lesson',
        id: 0,
        input: '',
        imageList: [],
        score: 1,
        uploadImgPath: []
      },
      teacher: {
        type: 'teacher',
        id: null,
        input: '',
        imageList: [],
        score: 1,
        uploadImgPath: []
      },
      institution: {
        type: 'institution',
        id: 0,
        input: '',
        imageList: [],
        score: 1,
        uploadImgPath: []
      }
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('评价');
    let params = JSON.parse(this.$route.query.obj);
    console.log('评价活动数据', params);

    this.teacher.id = params.teachers[0].id;
    this.lesson.id = params.lessonId;
    this.institution.id = params.instId;
    this.teacherList = params.teachers;
  },
  methods: {
    bindTeacherChange (e) {
      this.teacherValue = e.mp.detail.value;
      let result = this.teacherList.filter((item, index) => {
        return item.id === this.teacherList[this.teacherValue].id;
      });

      this.teacher.id = result[0].id;
    },

    getImageData (e) {
      // console.log(e);
      let tar = e.id.split('.');
      this[tar[0]][tar[1]] = e.imageList;
      // console.log(this[tar[0]][tar[1]]);
    },

    appraisalDesc (e) {
      // console.log(e);
      let tar = e.mp.target.id.split('.');
      this[tar[0]][tar[1]] = e.mp.detail.value;
    },

    getScore (e) {
      // console.log(e);
      let tar = e.id.split('.');
      this[tar[0]][tar[1]] = e.score;
    },

    uploadImg (url, type) {
      return new Promise((resolve, reject) => {
        this.$wxNetwork.uploadFile({url: url}).then(res => {
          // console.log(res);
          this[type].uploadImgPath.push('https://h.dyglxt.com' + res.url);
          resolve();
        }).then(res => {
          reject(res);
          // this.$wxUtils.toast({title: '提交图片失败，请重新上传'});
        });
      });
    },

    sendAppraData (params) {
      return new Promise((resolve, reject) => {
        let upoadImgPromise = [];
        if (params.imageList.length > 0) {
          params.imageList.forEach((item, index) => {
            upoadImgPromise.push(this.uploadImg(item, params.type));
          });
        }

        Promise.all(upoadImgPromise).then(res => {
          this.$network.base.commentOrder({
            content: params.input,
            images: params.uploadImgPath,
            star: params.score
          }, null, 'weapp/comment/' + params.type + '/' + params.id).then(res => {
            if (res.e === 0) {
              resolve();
            }
          });
        });
      });
    },

    submit () {
      if (!this.teacher.id) {
        this.$wxUtils.toast({title: '请选择要评价的老师'});
        return;
      };

      if (this.lesson.input.length < 5 || this.teacher.length < 5 || this.institution.input < 5) {
        this.$wxUtils.toast({title: '评论文字需要多余5个字'});
        return;
      };

      let request = [this.lesson, this.teacher, this.institution];
      let requestPromiseArr = [];
      request.forEach((item, index) => {
        this.sendAppraData(item);
      });

      this.$wxUtils.loading({title: '上传中...'});
      Promise.all(requestPromiseArr).then(res => {
        // console.log('提交结束', res);
        this.$wxUtils.loading({show: false});
        this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: true, feedback: true});
        setTimeout(() => {
          this.$store.commit(MutationType.SHOW_DIALOG_STATUS, {background: false, feedback: false});
          this.$router.back();
        }, 2000);
      });
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

    .section-picker-body {
      @include flex();
      margin-top: 30rpx;

      .section-picker-title {
        flex-basis: calc(30vw - 48rpx);
        flex-shrink: 0;
        margin-left: 20rpx;
        color: #bfbfbf;
        font-size: 16px;
      }

      .section-picker-text {
        flex-basis: 100%;

        .section-picker-icon {
          font-size: 12px;
          color: $topic-color;
        }
      }
    }

    .footer {
      padding: 40rpx;
    }
  }
</style>
