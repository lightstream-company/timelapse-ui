import { handleActions } from 'redux-actions';

export default handleActions({
  SET_TIME: (state, action) => action.payload
}, Date.now());
