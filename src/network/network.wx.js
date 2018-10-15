import * as Config from './config';

export default {
  /**
   * 上传文件
  */
  uploadFile ({url, name, data = {}}) {
    console.log('uploadfile');
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: Config.NetworkAPIHost + '/api/image/upload',
        filePath: url,
        name: 'imgfile',
        formData: data,
        success (res) {
          resolve(JSON.parse(res.data));
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
