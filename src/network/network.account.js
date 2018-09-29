import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取用户信息，需要直接将孩子信息和课程总数返回。
  */
  getUserInf: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 提交用户信息，头像先上传，在将返回的url提交。
   * @avatarURL:  头像路径
   * @nickname: 昵称
   * @name: 姓名
   * @area: 地区
  */
  postUserInf: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /** ******孩子*********/
  /**
   * 获取孩子列表
  */
  getChildrensList: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 获取孩子信息
  */
  getChildredInf: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 提交孩子信息
  */
  postChildrenInf: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 删除孩子信息
  */
  deleteChildrenInf: {
    url: 'user',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /** ******课程*********/
  /**
   * 获取课程列表数据
  */
  getCourseList: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
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

  /** ******孩子*********/
  /**
   * 获取商品列表
  */
  getCommodityList: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
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

  /** ******收藏*********/
  /**
   * 获取收藏的课程，老师，机构
  */
  getCollectionData: {
    url: 'user',
    method: 'get',
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
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      phone: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },
  /**
   * 获取地址详情
  */
  getAddressInf: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    }
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
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    }
  },
  /**
   * 删除地址信息
  */
  deleteAddressInf: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    }
  },
  /**
   * 反馈意见
   * @text: 反馈描述
   * @email: 邮箱
  */
  postFeedback: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    }
  }
};
