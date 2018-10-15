<template>
  <div class="purchase-appraisal-container">
    <div class="course-body section">
      <hoo-have-left-border-title :title="'商品评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'purchase.score'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="purchase.input" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'purchase.imageList'"></hoo-image-appraisal>
        </div>
      </div>
    </div>

    <div class="organi-body section">
      <hoo-have-left-border-title :title="'机构评价'"></hoo-have-left-border-title>
      <div class="section-score">
        <div class="label">星级评价</div>
        <div class="score-com">
          <hoo-score :type="'set'" :id="'organi.score'" @setScore="getScore"></hoo-score>
        </div>
      </div>
      <div class="section-input">
        <div class="label">评价内容</div>
        <div class="input-com">
          <textarea id="organi.input" @input="appraisalDesc" placeholder="请在这里输入评价~"></textarea>
        </div>
      </div>
      <div class="section-images">
        <div class="label">添加图片</div>
        <div class="image-com">
          <hoo-image-appraisal @imageData="getImageData" :id="'organi.imageList'"></hoo-image-appraisal>
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
      purchase: {
        input: '',
        imageList: [],
        score: 1,
        uploadImgUrl: []
      },
      organi: {
        input: '',
        imageList: [],
        score: 1,
        uploadImgUrl: []
      }
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('评价');
  },
  methods: {
    getImageData (e) {
      console.log(e);
      let tar = e.id.split('.');
      this[tar[0]][tar[1]] = e.imageList;
      console.log(this[tar[0]][tar[1]]);
    },

    appraisalDesc (e) {
      console.log(e);
      let tar = e.mp.target.id.split('.');
      this[tar[0]][tar[1]] = e.mp.detail.value;
    },

    getScore (e) {
      console.log(e);
      let tar = e.id.split('.');
      this[tar[0]][tar[1]] = e.score;
    },

    uploadImg (url, type) {
      return new Promise((resolve, reject) => {
        this.$wxNetwork.uploadFile({url: url}).then(res => {
          // console.log(res);
          this[type].uploadImgPath = 'https://h.dyglxt.com' + res.url;
          resolve();
        }).then(res => {
          reject(res);
          this.$wxUtils.toast({title: '提交图片失败，请重新上传'});
        });
      });
    },

    sendAppraData () {
      let img = ['http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg', 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg', 'http://f1-snap.oss-cn-beijing.aliyuncs.com/simditor/2018-09-10_133630.524091.jpeg'];
      console.log('debug');
      this.$network.base.commentOrder({
        content: '测试评价',
        imgjson: JSON.stringify(img),
        star: 4
      }, null, 'weapp/comment/lesson/1').then(res => {
        if (res.e === 0) {
          this.wxUtils.toast({title: '提交评论成功'});
        }
      });
    },

    submit () {
      if (this.purchase.content.length < 5 || this.organi.content < 5) {
        this.$wxUtils.toast({title: '评论文字需要多余5个字'});
        return;
      };

      // let request = [
      //   {id: 'product', obj: this.purchase},
      //   {id: 'institution', obj: this.organi}
      // ];
      // 先上传图片，获取图片链接。

      // 分别根据不同类型发送评论。

      // this.$router.back();
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
