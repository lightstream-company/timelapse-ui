import { handleActions } from 'redux-actions';

export default handleActions({
  SET_HILTI_COUNTER: (state, action) => Object.assign({}, state, action.payload)
}, {
  globalCount: 1000000,
  dailyOrder: 468,
  annualOrder: 5436778
});
