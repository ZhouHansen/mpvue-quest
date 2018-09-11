import {NetworkAPIVersion, NetworkParamType} from './config';
import DebugData from './debug.data';

export default {
  getOpenid: {
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
