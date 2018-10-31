import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
     * 获取推荐数据
    */
  getDashboard: {
    url: 'weapp/dashboard',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number],
      ltype: [NetworkParamType.string],
      date: [NetworkParamType.string] // 查找的时间范围：date - 1 至 date + 30 天范围内
    }
  },

  /**
   * 获取发现首页的商品
   * */
  getProduct: {
    url: 'weapp/product',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number],
      ages: [NetworkParamType.string],
      order: [NetworkParamType.string],
      name: [NetworkParamType.string],
      subjects: [NetworkParamType.sting]
    }
  },

  /**
   * 获取商品的详情
  */
  getProductDetail: {
    url: 'weapp/product/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 获取发现首页的列表数据，需要根据用户位置信息来获取（除了商品以外）
  */
  getDiscovery: {
    url: 'weapp/lesson',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number],
      order: [NetworkParamType.string],
      name: [NetworkParamType.string],
      instid: [NetworkParamType.number],
      city: [NetworkParamType.string],
      ltype: [NetworkParamType.string],
      prov: [NetworkParamType.string],
      subject: [NetworkParamType.sting],
      tid: [NetworkParamType.number]
    }
  },

  /**
   * 通过id获取课程、活动、商品的详情
  */
  getActivityDetail: {
    url: 'weapp/lesson/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {}
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
   * 商品、活动、课程 不拼团下单
   * @id: 商品、活动、课程的id
   * @children: 孩子信息
   * @number: 订单数量
   * @address: 地址 只有购买商品时需要
  */
  submitOrder: {
    url: 'weapp/order/place/{ptype}/{pid}', // ptype: lesson / product
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      cid: [NetworkParamType.number],
      count: [NetworkParamType.number],
      tag: [NetworkParamType.obj],
      address: [NetworkParamType.obj]
    }
  },

  /**
   * 商品、活动、课程 拼团下单
   * @id: 商品、活动、课程的id
   * @children: 孩子信息
   * @number: 订单数量
   * @address: 地址 只有购买商品时需要
  */
  submitOrderGroup: {
    url: 'weapp/order/joingroup/{gid}',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      cid: [NetworkParamType.number],
      count: [NetworkParamType.number],
      tag: [NetworkParamType.obj],
      address: [NetworkParamType.obj]
    }
  }
};
