require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_mutation_type__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_wx_utils__ = __webpack_require__(101);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {},
  data: function data() {
    return {};
  },
  created: function created() {
    // 调用应用实例的方法获取全局数据
    __WEBPACK_IMPORTED_MODULE_1__utils_wx_utils__["a" /* default */].getUserInfo();
  },
  mounted: function mounted() {
    this.Storage.set('aaa', '3toa');
    this.$store.commit(__WEBPACK_IMPORTED_MODULE_0__store_mutation_type__["a" /* SUM_TOTAL */], 10);

    console.log(__WEBPACK_IMPORTED_MODULE_1__utils_wx_utils__["a" /* default */].getPagesLength());
  },

  methods: {
    goSearchPage: function goSearchPage() {
      this.$router.push('/pages/search/index');
    },
    ajax: function ajax() {
      this.$network.base.getUserInf({ limit: 1, offset: 2 }).then(function (res) {
        // console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    },
    goCount: function goCount() {
      this.$router.push('/pages/counter/index');
    }
  }
});

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

// 获取当情页面战
var getPagesLength = function getPagesLength() {
  // return getCurrentPages(); // 需要关闭eslint检查
  return 'getCurrentPages';
};

// 获取用户信息
var getUserInfo = function getUserInfo() {
  // 调用登录接口
  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    wx.login({
      success: function success() {
        wx.getUserInfo({
          success: function success(res) {
            resolve(res.userInfo);
          }
        });
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getPagesLength: getPagesLength,
  getUserInfo: getUserInfo
});

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "front-container"
  }, [_c('div', {
    staticClass: "weui-search-bar"
  }, [_c('div', {
    staticClass: "weui-search-bar__form"
  }, [_c('label', {
    staticClass: "weui-search-bar__label",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.goSearchPage
    }
  }, [_c('div', {
    staticClass: "search-label-body flex-row-center"
  }, [_c('span', {
    staticClass: "search-icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "weui-search-bar__text ellipsis input-placeholder"
  }, [_vm._v("搜索课程、活动、老师、学校")])])])], 1)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5e9571b6", esExports)
  }
}

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_5e9571b6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(125);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5e9571b6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_5e9571b6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e9571b6", Component.options)
  } else {
    hotAPI.reload("data-v-5e9571b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 99:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[158]);
//# sourceMappingURL=index.js.map