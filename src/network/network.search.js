import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取课程列表数据
   * 需要根据学科，价格，日期，适龄进行过滤。
  */
  searchCourse: {
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
   * 获取老师列表数据
   * 根据学科，认证，好评 进行过滤。
  */
  searchSearch: {
    url: 'search',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.search
  },

  /*
  * 获取机构列表数据
  * 根据附近和认证 进行过滤。
  */
  searchOrgani: {
    url: 'search',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.search
  }
};
