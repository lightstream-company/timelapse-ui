import { handleActions } from 'redux-actions';

export default handleActions({
  DRAW_POINT: (state, actions) => {
    return Object.assign({}, state, {
      stream: actions.payload
    });
  }
}, {
  stream: {
    lng: 0,
    lat: 0
  }
});
