class Storage {
  set (key, val) {
    return wx.setStorageSync(key, val);
  }

  get (key) {
    return JSON.parse(wx.getStorageSync(key));
  }

  remove (key) {
    return wx.removeStorageSync(key);
  }
}

export default Storage;
