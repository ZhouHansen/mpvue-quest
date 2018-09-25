import * as Config from './config';

export default {
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
  }
};
