class Storage {
  static set (key, val) {
    return wx.setStorageSync(key, val);
  }

  static get (key) {
    let result = wx.getStorageSync(key);
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  static remove (key) {
    return wx.removeStorageSync(key);
  }
}

export default Storage;
