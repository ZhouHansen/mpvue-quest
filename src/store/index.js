import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutation';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => {
          wx.getStorageSync(key);
          console.log('getItem');
        },
        setItem: (key, value) => {
          wx.setStorageSync(key, value);
          console.log('setItem');
        },
        removeItem: key => {
          // wx.removeStorageSync(key);
          // console.log('removeItem');
        }
      }
    })
  ]
});
