import { handleActions } from 'redux-actions';
import { Options as State } from './types';

const initialState = new State({
  bgColor: '444444'
});

export default handleActions({
  LOAD_OPTIONS: (state, {payload}) => {
    if (payload && payload.bgColor) {
      return State.update(state, {
        bgColor: {
          '$set': payload.bgColor
        }
      });
    } else {
      return state;
    }
  }
}, initialState);
