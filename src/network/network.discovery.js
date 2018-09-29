import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取发现首页的列表数据，需要根据用户位置信息来获取（除了商品以外）
  */
  getDiscovery: {
    url: 'discovery',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.discovery
  },

  /**
   * 通过id获取课程、活动、商品的详情
  */
  getActivityDetail: {
    url: 'discovery',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.discovery
  },

  /**
   * 通过id 获取课程、活动、商品的拼团价格
  */
  getActivityGroupPrice: {
    url: 'discovery',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.discovery
  },

  /**
   * 通过id 获取课程、活动、商品的评价
  */
  getActivityAppraisal: {
    url: 'discovery',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.discovery
  },

  /**
   * 设置活动、课程者商品的收藏
  */
  setCollection: {
    url: 'collection/set',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.setCollection
  },

  /**
   * 取消活动、课程或商品的收藏
  */
  cancelCollection: {
    url: 'collection/cancel',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.cancelCollection
  },

  /**
   * 报名参加活动、课程
  */
  joinActivity: {
    url: 'acityvity/join',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.joinActivity
  },

  /**
   * 取消参加课程、活动
  */
  cancelJoinActivity: {
    url: 'acityvity/join/cancel',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.cancelJoinActivity
  },
  /**
   * 获取 课程、活动的推荐时间
  */
  getSelectDate: {
    url: '',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string]
    },
    debug: DebugData.getSelectDate
  },

  /**
   * 商品、活动、课程 下单
   * @id: 商品、活动、课程的id
   * @children: 孩子信息
   * @number: 订单数量
   * @address: 地址 只有购买商品时需要
  */
  submitOrder: {
    url: '',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string],
      children: [NetworkParamType.string],
      number: [NetworkParamType.number],
      address: [NetworkParamType.address]
    },
    debug: DebugData.getSelectDate
  }
};
