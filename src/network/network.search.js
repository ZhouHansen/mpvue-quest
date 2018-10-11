import {NetworkAPIVersion, NetworkParamType} from './config';

export default {
  /**
   * 获取课程列表数据
   * 需要根据学科，价格，日期，适龄进行过滤。
  */
  searchCourse: {
    url: 'weapp/lesson',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /**
   * 获取老师列表数据
   * 根据学科，认证，好评 进行过滤。
  */
  searchTearch: {
    url: 'weapp/teacher',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  },

  /*
  * 获取机构列表数据
  * 根据附近和认证 进行过滤。
  */
  searchOrgani: {
    url: 'weapp/inst',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  }
};
