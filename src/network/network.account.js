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
    url: 'weapp/verifycode/{cell}',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 绑定手机号
  */
  bindPhoneToOpenid: {
    url: 'weapp/bindingcell/{cell}/{vcode}',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
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

  /** ******订单*********/
  /**
   * 取消订单
  */
  cancelOrder: {
    url: 'weapp/order/cancel/:id',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 获取历史订单
  */
  getOrderHIstory: {
    url: 'weapp/closedorders/{ptype}', // lesson  product
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /**
   * 更新订单状态
  */
  updateOrder: {
    url: 'weapp/order/pay/{oid}', // lesson  product
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 获取单个订单信息
  */
  getOrderDetail: {
    url: 'weapp/order/{uuid}', // lesson  product
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /** ******课程*********/
  /**
   * 获取课程日历数据
  */
  getCourseCalendarList: {
    url: 'weapp/calendar',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /**
   * 获取课程数据
  */
  getCourseList: {
    url: 'weapp/orders/{type}',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },
  /**
   * 获取等待评价数据
  */
  getCourseListWaitAppr: {
    url: 'weapp/uncommentedorders/{ptype}',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.mber]
    }
  },
  /**
   * 获取等待支付数据
  */
  getCourseListWaitPay: {
    url: 'weapp/unpaidorders/{ptype}',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
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

  /** ******设置*********/
  /**
   * 获取地址列表
  */
  getDefaultAddress: {
    url: 'weapp/prim/address',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

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
