import { handleActions } from 'redux-actions';

export default handleActions({
  SET_HILTI_COUNTER: (state, action) => Object.assign({}, state, action.payload)
}, {
  globalCount: 0,
  dailyOrder: 0,
  annualOrder: 0
});
