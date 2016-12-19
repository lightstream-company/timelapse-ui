import { handleActions } from 'redux-actions';
import { Options as State } from './types';

const initialState = new State({
  bgColor: '333'
});

export default handleActions({
  LOAD_OPTIONS: (state, action) => State.update(state, {
    bgColor: {
      '$set': action.payload.bgColor
    }
  })
}, initialState);
