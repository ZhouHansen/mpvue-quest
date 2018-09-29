import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取地图机构的城市列表
  */
  getFilterByMapCity: {
    url: 'search',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.search
  },

  /**
   * 获取地图推荐机构
  */
  getRecommendOrgani: {
    url: 'search',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.search
  },

  /**
   * 获取机构详情信息
  */
  getOrganiDetail: {
    url: 'search',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string],
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.search
  },

  /*
  * 获取机构下的课程, 老师, 评价
  */
  getNavDataByOrgani: {
    url: 'search',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: [NetworkParamType.string],
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.search
  }
};
