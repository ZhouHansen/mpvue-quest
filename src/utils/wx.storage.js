
class Storage {
  set (key, val) {
    return wx.setStorageSync(key, val);
  }

  get (key) {
    let result = wx.getStorageSync(key);
    if (result) {
      return wx.getStorageSync(key);
    } else {
      return null;
    }
  }

  remove (key) {
    return wx.removeStorageSync(key);
  }
}

export default Storage;
