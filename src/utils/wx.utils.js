import StorageTypeName from './storage.typename';
import Storage from './wx.storage';

// 获取当前页面战
const getPagesLength = () => {
  // return getCurrentPages(); // 需要关闭eslint检查
  return 'getCurrentPages';
};

// 获取用户信息
const getUserInfo = () => {
  // 调用登录接口
  return new Promise((resolve, reject) => {
    wx.login({
      success: () => {
        wx.getUserInfo({
          success: res => {
            resolve(res.userInfo);
          }
        });
      }
    });
  });
};

// 获取用户位置信息.
// 保存在Storage, 超过5分钟重新获取
const getLocation = () => {
  let location = Storage.get(StorageTypeName.location);
  let timestamp = parseInt(new Date() / 1000);
  let time = 5 * 60;
  return new Promise((resolve, reject) => {
    if (location && timestamp - location.timestamp < time) {
      resolve(location);
    } else {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          res.timestamp = timestamp;
          Storage.set(StorageTypeName.location, res);
          resolve(res);
        }
      });
    }
  });
};

const callPhone = ({phone}) => {
  wx.makePhoneCall({
    phoneNumber: phone // 仅为示例，并非真实的电话号码
  });
};

const loading = ({title, mask = false, show}) => {
  if (show) {
    wx.showLoading({
      title: title,
      mask: mask
    });
  } else {
    wx.hideLoading();
  }
};

const toast = ({title, icon = 'none', hide}) => {
  if (hide) {
    wx.hideToast();
  } else {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    });
  }
};

export default {
  getPagesLength,
  getUserInfo,
  getLocation,
  callPhone,
  loading,
  toast
};
