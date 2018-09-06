import * as types from './mutation.type';

const Mutations = {
  /**
  * state: 当前状态树
  * param: 提交matations时传的参数
  */
  [types.SUM_TOTAL] (state, param) {
    // console.log(state);
    state.total_count = state.total_count + param;
    // console.log(param);
  }
};

export default Mutations;
