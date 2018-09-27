import Vue from 'vue';
import App from './App';
import Store from './store/index';
import Network from './network/index';
import WxNetwork from './network/network.wx';
import MpvueRouterPatch from 'mpvue-router-patch';

import Storage from '@/utils/wx.storage';
import StorageTypeName from '@/utils/storage.typename';
import WxUtils from '@/utils/wx.utils';
import '@/utils/wx.onlanch';

import '@/assets/style/weui.scss';
import '@/assets/style/base.scss';

import Hack from './plugs/hack';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

// 开始挂载插件对象
Vue.prototype.$store = Store;
Vue.prototype.$network = Network;
Vue.prototype.$wxNetwork = WxNetwork;
Vue.prototype.$storage = Storage;
Vue.prototype.$storageTypeName = StorageTypeName;
Vue.prototype.$wxUtils = WxUtils;
Vue.use(MpvueRouterPatch);
Vue.use(Hack);

export default {
  config: {
    pages: [],
    windows: {
      navigationBarTitleText: '首页',
      enablePullDownRefresh: true,
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff'
    },
    tabBar: {
      color: '#454545',
      borderStyle: 'white',
      selectedColor: '#32DA31',
      position: 'bottom',
      list: [{
        pagePath: 'pages/index/index',
        text: '发现',
        iconPath: '/assets/images/ic_tab_see_off.png',
        selectedIconPath: '/assets/images/ic_tab_see_on.png'
      }, {
        pagePath: 'pages/counter/index',
        text: '机构',
        iconPath: '/assets/images/ic_tab_org_off.png',
        selectedIconPath: '/assets/images/ic_tab_org_on.png'
      }, {
        pagePath: 'pages/counter/index',
        text: '老师',
        iconPath: '/assets/images/ic_tab_teacher_off.png',
        selectedIconPath: '/assets/images/ic_tab_teacher_on.png'
      }, {
        pagePath: 'pages/counter/index',
        text: '我的',
        iconPath: '/assets/images/ic_tab_me_off.png',
        selectedIconPath: '/assets/images/ic_tab_me_on.png'
      }]
    }
  }
};
