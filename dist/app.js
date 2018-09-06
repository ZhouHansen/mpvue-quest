require("common/manifest.js");
require("common/vendor.js");
global.webpackJsonp([7],{

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__network_index__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mpvue_router_patch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_style_weui_scss__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_style_weui_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_style_weui_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_style_base_scss__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_style_base_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_style_base_scss__);











__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

// 开始挂载插件对象
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$store = __WEBPACK_IMPORTED_MODULE_2__store_index__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$network = new __WEBPACK_IMPORTED_MODULE_3__network_index__["a" /* default */]();
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.Storage = new __WEBPACK_IMPORTED_MODULE_5__utils_storage__["a" /* default */]();
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_mpvue_router_patch__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(66);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(65)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66a2bbad", Component.options)
  } else {
    hotAPI.reload("data-v-66a2bbad", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 65:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {}
});

/***/ })

},[63]);
//# sourceMappingURL=app.js.map