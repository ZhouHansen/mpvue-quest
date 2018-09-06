import {NetworkAPIVersion, NetworkParamType} from './config';

export default {
  getUserInf: {
    url: 'user',
    method: 'get',
    apiVersion: NetworkAPIVersion.v1_version,
    params: {
      limit: [NetworkParamType.number],
      offset: [NetworkParamType.number]
    }
  }
};
