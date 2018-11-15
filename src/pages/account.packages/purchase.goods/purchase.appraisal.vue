<template>
  <div class="purchase-appraisal-container">
    <div class="course-body section">
      <hoo-have-left-border-title :title="'商品评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'product.score'" :score="product.score" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="product.input" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'product.imageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>

    <div class="organi-body section">
      <hoo-have-left-border-title :title="'机构评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'institution.score'" :score="institution.score" @setScore="getScore"></hoo-score>
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
  props: [''],
  components: {
    hooHaveLeftBorderTitle,
    hooScore,
    hooImageAppraisal,
    hooButton,
    hooFeedback
  },
  data () {
    return {
      product: {
        type: 'product',
        id: 0,
        input: '',
        imageList: [],
        score: 4,
        uploadImgPath: []
      },
      institution: {
        type: 'institution',
        id: 0,
        input: '',
        imageList: [],
        score: 4,
        uploadImgPath: []
      },
      orderno: ''
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('评价');
    // console.log(this.$route.query.obj);
    let params = JSON.parse(this.$route.query.obj);
    // console.log(params);

    this.product.id = params.productId;
    this.institution.id = params.instId;
    this.orderno = params.orderno;
  },
  methods: {
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
            star: params.score,
            orderno: this.orderno
          }, null, 'weapp/comment/' + params.type + '/' + params.id).then(res => {
            if (res.e === 0) {
              resolve();
            }
          });
        });
      });
    },

    submit () {
      if (this.product.input.length < 5 || this.institution.input < 5) {
        this.$wxUtils.toast({title: '评论文字需要多余5个字呦～'});
        return;
      };

      let request = [this.product, this.institution];
      let requestPromiseArr = [];
      request.forEach((item, index) => {
        this.sendAppraData(item);
      });

      this.$wxUtils.loading({title: '上传中...'});
      Promise.all(requestPromiseArr).then(res => {
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

  .purchase-appraisal-container {
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
