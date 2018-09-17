import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  getDiscovery: {
    url: 'discovery',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    },
    debug: DebugData.discovery
  },
  setCollection: {
    url: 'collection/set',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: '123'
    },
    debug: DebugData.setCollection
  },
  cancelCollection: {
    url: 'collection/cancel',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: '123'
    },
    debug: DebugData.cancelCollection
  },
  joinActivity: {
    url: 'acityvity/join',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: '123'
    },
    debug: DebugData.joinActivity
  },
  cancelJoinActivity: {
    url: 'acityvity/join/cancel',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: '123'
    },
    debug: DebugData.cancelJoinActivity
  },
  getSelectDate: {
    url: '',
    method: 'post',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      id: '123'
    },
    debug: DebugData.getSelectDate
  }
};
