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
    url: 'login',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      code: [NetworkParamType.string]
    }
  },

  /**
   * 获取用户信息
   */

  getUserInf: {
    url: 'profile',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
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
  }

};
