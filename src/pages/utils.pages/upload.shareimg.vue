<template>
  <div class="uploadimg-container">
    <div class="uploadimg-bgc" v-if="showImg"></div>
    <div class="convas-img">
      <canvas :canvas-id="'shareImg'" :style="{'width': width + 'px', 'height': height + 'px'}"></canvas>
    </div>
    <div class="uploadimg-save">
      <span @click="saveImgToAlbum">保存图片</span>
    </div>
  </div>
</template>
<script>
import CTB from '@/plugs/content-text-break';

export default {
  mounted () {
    let _this = this;
    this.$wxUtils.setNavTitle('保存图片');
    this.urlparams = JSON.parse(this.$route.query.obj);
    this.system = this.$storage.get('system');
    this.width = 0.9 * this.system.screenWidth;
    this.height = 0.7 * this.system.screenHeight;
    this.modleWidth = this.width;
    this.modleHeight = this.height * 0.20;

    this.$wxUtils.loading({title: '图片生成中...'});

    this.ctx = wx.createCanvasContext('shareImg');
    // 画整体背景
    this.ctx.setFillStyle('#ffffff');
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fill();

    // 主要背景
    this.ctx.beginPath();
    this.ctx.setFillStyle('#e1f3e0');
    this.ctx.fillRect(0, 0, this.width, this.height - this.modleHeight);
    this.ctx.fill();

    // 画底部模块
    this.ctx.beginPath();
    this.ctx.setFillStyle('#ffffff');
    this.ctx.fillRect(this.width - this.modleWidth, this.height - this.modleHeight, this.modleWidth, this.modleHeight);
    this.ctx.fill();

    // 画标题
    this.drawTitle();

    // 画标的下划线
    this.drawTitleBottomBorder();

    // 画正文
    this.drawContext();

    // 画二维码
    this.getImageInf().then(res => {
      this.ctx.beginPath();
      let imgLimit = 0.8;
      let imgPx = this.width - (this.modleHeight * imgLimit) - 20;
      let imgPy = this.height - this.modleHeight + ((this.modleHeight - this.modleHeight * imgLimit) / 2);
      this.ctx.drawImage(res.path, imgPx, imgPy, this.modleHeight * imgLimit, this.modleHeight * imgLimit);
      this.ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          width: this.width,
          height: this.height,
          canvasId: 'shareImg',
          success (res) {
            console.log(res);
            _this.outputImg = res.tempFilePath;
            _this.$wxUtils.loading({show: false});
            _this.showImg = false;
          }
        });
      });
    });
  },
  data () {
    return {
      showImg: true,
      system: null,
      urlparams: null,
      ctx: null,
      qrcode: 'https://h.dyglxt.com/images/logo2.png',
      width: 0, // 90vw
      height: 0, // 70vh
      outputImg: null,
      paddingTop: 25,
      paddingLeft: 20,
      modleWidth: null,
      modleHeight: null
    };
  },
  methods: {
    drawTitle () {
      let _this = this;
      let text = '';
      if (_this.urlparams.name.length > 25) {
        text = _this.urlparams.name.substr(0, 25) + '...';
      } else {
        text = _this.urlparams.name.substr(0, 25);
      }
      CTB({
        ctx: _this.ctx,
        text: text,
        x: _this.paddingLeft,
        y: _this.paddingTop,
        w: _this.width - (2 * _this.paddingLeft),
        fontStyle: {
          lineHeight: 18,
          textAlign: 'left',
          textBaseline: 'top',
          font: 'normal 16px arial',
          fontSize: 16,
          fillStyle: '#000000'
        }
      });
    },

    drawTitleBottomBorder () {
      this.ctx.beginPath();
      this.ctx.setFillStyle('gray');
      this.ctx.fillRect(this.paddingLeft, this.paddingTop + 60, this.width - (2 * this.paddingLeft), 1);
      this.ctx.fillRect(this.paddingLeft, this.paddingTop + 62, this.width - (2 * this.paddingLeft), 1);
      this.ctx.fill();
    },

    drawContext () {
      let _this = this;
      let text = '';
      if (_this.urlparams.context.length > 150) {
        text = _this.urlparams.context.substr(0, 150) + '...';
      } else {
        text = _this.urlparams.context.substr(0, 150);
      }
      CTB({
        ctx: _this.ctx,
        text: _this.urlparams.name + text,
        x: _this.paddingLeft,
        y: _this.paddingTop + 100,
        w: _this.width - (2 * _this.paddingLeft),
        fontStyle: {
          lineHeight: 20,
          textAlign: 'left',
          textBaseline: 'top',
          font: 'normal 14px arial',
          fontSize: 14,
          fillStyle: '#000000'
        }
      });
    },

    getImageInf () {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this.$network.base.getPageQrcode(null, null, 'weapp/codecard/' + _this.urlparams.pageType + '/' + _this.urlparams.id + '?isshare=1&type=' + _this.urlparams.pageType).then(res => {
          wx.getImageInfo({
            src: 'https://h.dyglxt.com/api/v1/weapp/codecard/' + _this.urlparams.pageType + '/' + _this.urlparams.id,
            success (res) {
              resolve(res);
            }
          });
        });
      });
    },

    saveImgToAlbum () {
      let _this = this;
      console.log('save img');
      wx.saveImageToPhotosAlbum({
        filePath: this.outputImg,
        success (res) {
          _this.$wxUtils.toast({title: '保存成功'});
        },
        complete (res) {
          console.log(res);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .uploadimg-container {
    min-height: 100vh;
    background-color:#f9f9f9;

    .uploadimg-bgc {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #ffffff;
      z-index: 9999;
    }

    .convas-img {
      width: 90vw;
      height: 80vh;
      padding-top: 5vh;
      margin: 0 auto;

      canvas {
        border: 1rpx solid #dcdcdc;
      }
    }

    .uploadimg-save {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 84%;
      padding: 25rpx 8%;
      border-top: 1rpx solid #dcdcdc;
      background-color:#ffffff;

      span {
        display: inline-block;
        width: 100%;
        padding: 25rpx 0;
        text-align: center;
        background-color: $topic-color;
        color: #ffffff;
      }
    }
  }
</style>
