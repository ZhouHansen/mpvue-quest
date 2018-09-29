import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  /**
   * 获取课程科目
  */
  getCourseFilter: {
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
   * 获取老师列表，通过科目过滤
  */
  getTeacherList: {
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
   * 获取老师详情
  */
  getTeacherDetail: {
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
   * 获取老师的课程
  */
  getCourseByTeacher: {
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
   * 获取老师的课程
  */
  getAppraisalByTeacher: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.getOpenid
  }
};
