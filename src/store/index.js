import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutation';

// import createPersistedState from 'vuex-persistedstate';
import Module from './module';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    search: Module.Search,
    discovery: Module.Discovery
  },
  plugins: [
    // createPersistedState({
    //   storage: {
    //     getItem: key => {
    //       wx.getStorageSync(key);
    //     },
    //     setItem: (key, value) => {
    //       if (value) {
    //         wx.setStorageSync(key, value);
    //       }
    //     },
    //     removeItem: key => {
    //       // wx.removeStorageSync(key);
    //       // console.log('removeItem');
    //     }
    //   }
    // })
  ]
});
