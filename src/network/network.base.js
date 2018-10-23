import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取用户的openid，使用wxlogin的code去后台获取
  */
  getOpenid: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /**
   * 登录
   * **/
  login: {
    url: 'weapp/login',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      code: [NetworkParamType.string]
    }
  },

  /**
   * 使用下单的id获取支付配置，然后进行支付
   * network.wx.js 中保存微信支付请求
  */
  getWxPaymentParams: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string],
      openid: [NetworkParamType.string]
    },
    debug: DebugData.getOpenid
  },

  /**
   * 设置活动课程、商品、机构、老师的收藏
  */
  getCollectionList: {
    url: 'weapp/favors/{lesson / product / teacher / institution}',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /**
   * 设置活动课程、商品、机构、老师的收藏
  */
  setCollection: {
    url: 'weapp/favor/{lesson / product / teacher / institution}/:id',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 取消活动课程、商品、机构、老师的收藏
  */
  cancelCollection: {
    url: 'weapp/favor/del/:id',
    method: 'delete',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 记录活动课程、商品、机构、老师的分享
  */
  recordShare: {
    url: 'weapp/share/{lesson / product / teacher / institution}/:id',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 评论活动课程、商品、机构、老师
  */
  commentOrder: {
    url: 'weapp/comment/{lesson / product / teacher / institution}/:id',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      content: [NetworkParamType.string],
      images: [NetworkParamType.array],
      star: [NetworkParamType.number]
    }
  },

  /**
   * 获取评论列表  活动课程、商品、机构、老师
  */
  getCommentList: {
    url: 'weapp/comments/{lesson / product / teacher / institution}/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
    }
  }
};
