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

export default {
  getPagesLength,
  getUserInfo,
  loading
};
