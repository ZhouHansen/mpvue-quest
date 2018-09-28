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
    },
    debug: DebugData.getOpenid
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
  }

};
