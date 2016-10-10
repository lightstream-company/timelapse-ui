import { handleActions } from 'redux-actions';

export default handleActions({
  LOAD_OPTIONS: (state, actions) => {
    return Object.assign({}, state, actions.payload);
  }
}, {});
