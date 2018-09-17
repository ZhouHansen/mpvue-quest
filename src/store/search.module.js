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
    [MutationsType.SET_CHOOSE_DATE] (state, param) {
      state.order['date'] = param;
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
