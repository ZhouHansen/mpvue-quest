import StorageTypeName from './storage.typename';
import Storage from './wx.storage';
import UnCheckFun from './uncheck.utils';

// 获取当前页面战
const getPagesLength = () => {
  return UnCheckFun.getPagesLength();
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
    if (location && (timestamp - location.timestamp < time)) {
      console.log('getlocation storage', location);
      resolve(location);
    } else {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log('getlocation wx', res);
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

const loading = ({title = '', mask = false, show = true}) => {
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

const showModal = obj => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: obj.title,
      success (res) {
        resolve(res);
      }
    });
  });
};

const download = ({url}) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: url,
      success: (res) => {
        resolve(res.tempFilePath);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
};

const setNavTitle = text => {
  wx.setNavigationBarTitle({
    title: text
  });
};

const chooseImg = ({num = 1}) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePaths 可以作为img标签的src属性显示图片
        resolve(res);
      }
    });
  });
};

const previewImage = ({urls}) => {
  wx.previewImage({
    urls: urls
  });
};

export default {
  getPagesLength,
  getUserInfo,
  getLocation,
  callPhone,
  loading,
  toast,
  showModal,
  download,
  setNavTitle,
  chooseImg,
  previewImage
};
