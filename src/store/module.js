import MapKeys from 'lodash/mapKeys';
import * as MutationsType from './mutation.type';

const Search = {
  state: {
    isOverFlowStatu: false
  },
  mutations: {
    [MutationsType.TOGGLE_SEARCH_OVERFLOW] (state, param) {
      state.isOverFlowStatu = param;
    }
  }
};

const Discovery = {
  state: {
    activity: {},
    order: {}
  },
  mutations: {
    [MutationsType.SET_ORDER_PARAMS] (state, params) {
      MapKeys(params, (value, key) => {
        state.order[key] = value;
      });

      if (typeof params.cb === 'function') {
        params.cb();
      }
    },
    [MutationsType.SET_CHOOSE_ACTIVITY] (state, param) {
      state.activity = param;
    }
  }
};

export default {
  Search,
  Discovery
};
