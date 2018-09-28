import Network from '@/network/index';
import Storage from '@/utils/wx.storage';
import StorageTypeName from '@/utils/storage.typename';
import Utils from '@/utils/wx.utils';

// var user = wx.getStorageSync('user') || {};
// 取出storage 如果不存在，就执行登录请求，获取openid。
// if (user == null && (!user.api_key || !user.username)) {
// 登录
wx.login({
  success: res => {
    Network.base.getOpenid({ 'code': res.code }).then(res => {
      console.log(res);
      Storage.set(StorageTypeName.openid, res.openid);
    });
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
  }
});
// };

// 获取用户授权信息
wx.getSetting({
  success: res => {
    // console.log(res)
    if (res.authSetting['scope.userInfo']) {
      let wxUserInf = Storage.get(StorageTypeName['wxUserInf']);
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      if (wxUserInf) {
        return;
      }
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          console.log(res.userInfo);
          Storage.set(StorageTypeName['wxUserInf'], res.userInfo);
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
        }
      });
    } else { // 主动调用授权，放置用户在storage拒绝授权时一段时间内不会再提示
      // wx.authorize({
      //   scope: 'scope.userInfo',
      //   success () {
      //     wx.getUserInfo({
      //       success: res => {
      //         // 可以将 res 发送给后台解码出 unionId
      //         console.log(res.userInfo);
      //       }
      //     });
      //   }
      // });
    };

    // 用户地理信息授权
    // console.log(res.authSetting)
    if (!res.authSetting['scope.userLocation']) {
      wx.authorize({
        scope: 'scope.userLocation',
        success (res) {
          console.log(res);
        },
        fail (res) {
          wx.openSetting({
            success: (res) => {
              /*
               * res.authSetting = {
               *   "scope.userInfo": true,
               *   "scope.userLocation": true
               * }
               */
              console.log(res);

              if (res.authSetting['scope.userLocation']) {
                // 当打开小程序时，没有进行定位授权，都会打开设置页面，授权成功之后，重新加载此页面
                // var params = '';
                // for (let q in options.query) {
                //   params = params + q + '=' + options.query[q] + '&';
                // };
                // wx.redirectTo({
                //   url: '/' + options.path + '?' + params.substring(0, params.length - 1)
                // });
              }
            }
          });// 打开小程序设置页面
          console.log('fail', res);
        }
      });
    } else {
      Utils.getLocation().then(res => {
        console.log(res);
      });
    }
  }
});

// 保存设备参数
let systemData = Storage.get(StorageTypeName['system']);

if (!systemData) {
  Storage.set(StorageTypeName['system'], wx.getSystemInfoSync());
}
