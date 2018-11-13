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
      offset: [NetworkParamType.number],
      order: [NetworkParamType.string],
      name: [NetworkParamType.string],
      instid: [NetworkParamType.number],
      city: [NetworkParamType.string],
      ltype: [NetworkParamType.string],
      prov: [NetworkParamType.string],
      subject: [NetworkParamType.sting],
      tid: [NetworkParamType.number],
      date: [NetworkParamType.string],
      pup: [NetworkParamType.number],
      pdown: [NetworkParamType.number],
      age: [NetworkParamType.number]
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
      offset: [NetworkParamType.number],
      instid: [NetworkParamType.number],
      name: [NetworkParamType.string],
      order: [NetworkParamType.string],
      subjects: [NetworkParamType.string],
      sort: [NetworkParamType.string],
      endorsed: [NetworkParamType.number]
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
      offset: [NetworkParamType.number],
      city: [NetworkParamType.sting],
      name: [NetworkParamType.string],
      order: [NetworkParamType.string],
      prov: [NetworkParamType.string],
      endorsed: [NetworkParamType.number]
    }
  }
};
