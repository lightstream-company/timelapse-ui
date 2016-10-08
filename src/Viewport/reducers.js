import { handleActions } from 'redux-actions';

export default handleActions({
  VIEWPORT_RESIZED: (state, actions) => Object.assign({}, state, actions.payload)
}, {
  width: 500,
  height: 500
});
