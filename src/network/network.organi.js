import {NetworkAPIVersion, NetworkParamType} from './config';

export default {
  /**
   * 获取地图机构的城市列表
  */
  getFilterByMapCity: {
    url: 'weapp/inst',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /**
   * 获取地图推荐机构
  */
  getRecommendOrgani: {
    url: 'weapp/dashboard/insts',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true
  },

  /**
   * 获取机构详情信息
  */
  getOrganiDetail: {
    url: 'weapp/inst/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
    }
  }
};
