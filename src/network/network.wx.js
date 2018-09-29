import * as Config from './config';

export default {
  /**
   * 上传文件
  */
  uploadFile ({url = '', name = '', data = {}}) {
    console.log('uploadfile');
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: Config.NetworkAPIHost + Config.NetworkAPIVersion + '/upload', // 仅为示例，非真实的接口地址
        filePath: url,
        name: name,
        formData: data,
        success (res) {
          resolve(res.data);
        }
      });
    });
  },

  /**
   * 调用微信支付请求
  */

  wxPayment (params) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        'timeStamp': params.timeStamp,
        'nonceStr': params.nonceStr,
        'package': params.package,
        'signType': 'MD5',
        'paySign': params.paySign,
        'success' (res) {
          resolve(res);
        },
        'fail' (res) {
          reject(res);
        }
      });
    });
  }
};
