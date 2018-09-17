import * as MutationType from './mutation.type';
import _ from 'lodash';

const Mutations = {
  [MutationType.OVERFLOW_HIDDEN_STATUS] (state, params) {
    state.overflowHiddenStatus = params;
  },

  [MutationType.SHOW_DIALOG_STATUS] (state, params) {
    state.overflowHiddenStatus = params.background;
    state.showDialogStatus.background = params.background;

    _.map(params, (value, key) => {
      state.showDialogStatus[key] = value;
    });
  }
};

export default Mutations;
