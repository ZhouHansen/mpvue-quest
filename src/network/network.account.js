import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取用户信息，需要直接将孩子信息和课程总数返回。
  */
  getUserInf: {
    url: 'weapp/profile',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 提交用户信息，头像先上传，在将返回的url提交。
   * @avatarURL:  头像路径
   * @nickname: 昵称
   * @name: 姓名
   * @area: 地区
  */
  uploadUserInf: {
    url: 'weapp/updateprofile',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      avatarurl: [NetworkParamType.string],
      city: [NetworkParamType.string],
      cell: [NetworkParamType.string],
      gender: [NetworkParamType.string],
      name: [NetworkParamType.string],
      nickname: [NetworkParamType.string]
    }
  },

  /**
   * 发送短信
  */
  sendVerifyMessage: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /**
   * 绑定手机号
  */
  bindPhoneToOpenid: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string],
      code: [NetworkParamType.string],
      openid: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /** ******孩子*********/
  /**
   * 获取孩子列表
  */
  getChildrensList: {
    url: 'weapp/children',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },
  /**
   * 获取孩子信息
  */
  getChildrenInf: {
    url: 'weapp/child/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },
  /**
   * 提交孩子信息
  */
  postChildrenInf: {
    url: 'weapp/child',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      avatar: [NetworkParamType.string],
      birthday: [NetworkParamType.string],
      gender: [NetworkParamType.string],
      id: [NetworkParamType.number],
      name: [NetworkParamType.string],
      ssn: [NetworkParamType.string]
    }
  },
  /**
   * 删除孩子信息
  */
  deleteChildrenInf: {
    url: 'weapp/child/:id',
    method: 'delete',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /** ******课程*********/
  /**
   * 获取课程列表数据
  */
  getCourseList: {
    url: 'weapp/orders/lesson',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },
  /**
   * 获取课程详情
  */
  getCourseInf: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 取消课程订单
  */
  cancelCourseOrder: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 提交课程评价
  */
  postCourseAppraisal: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 获取课程历史记录
  */
  getHistoryByCourse: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /** ******商品*********/
  /**
   * 获取商品列表
  */
  getCommodityList: {
    url: 'weapp/orders/product',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },
  /**
   * 获取商品详情
  */
  getCommodityInf: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 取消商品订单
  */
  cancelOrderByCommodity: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 确认收货
  */
  confirmOrderByCommodity: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 评价商品
  */
  postCommodityAppraisal: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /** ******设置*********/
  /**
   * 获取地址列表
  */
  getAddressList: {
    url: 'weapp/addresses',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },
  /**
   * 获取地址详情
  */
  getAddressInf: {
    url: 'weapp/addresses/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 提交编辑地址
   * @area: 省市区,
   * @address: 详细信息,
   * @name: 姓名
   * @phone: 联系方式
   * @default: 设置默认地址
  */
  postAddressInf: {
    url: 'weapp/address',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      address: [NetworkParamType.string],
      cell: [NetworkParamType.string],
      cell2: [NetworkParamType.string],
      city: [NetworkParamType.string],
      district: [NetworkParamType.string],
      id: [NetworkParamType.number],
      name: [NetworkParamType.string],
      prim: [NetworkParamType.number], // 0 or 1 默认地址
      prov: [NetworkParamType.string]
    }
  },
  /**
   * 删除地址信息
  */
  deleteAddressInf: {
    url: 'weapp/address/:id',
    method: 'delete',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 反馈意见
   * @text: 反馈描述
   * @email: 邮箱
  */
  postFeedback: {
    url: 'weapp/feedback',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      entity: [NetworkParamType.object]
    }
  }
};
