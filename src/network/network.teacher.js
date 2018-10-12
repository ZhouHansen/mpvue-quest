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
      subjects: [NetworkParamType.sting]
    }
  },
  /**
   * 获取老师详情
  */
  getTeacherDetail: {
    url: 'weapp/teacher/:id',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    authorization: true,
    params: {
    }
  },

  /**
   * 获取老师的评论
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
