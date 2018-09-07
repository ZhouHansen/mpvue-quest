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

export default Search;
