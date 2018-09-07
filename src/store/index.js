import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutation';

import createPersistedState from 'vuex-persistedstate';
import SearchModule from './search.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    search: SearchModule
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => {
          wx.getStorageSync(key);
        },
        setItem: (key, value) => {
          wx.setStorageSync(key, value);
        },
        removeItem: key => {
          // wx.removeStorageSync(key);
          // console.log('removeItem');
        }
      }
    })
  ]
});
