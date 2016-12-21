import { handleActions } from 'redux-actions';
import { WallState } from './types';


export default handleActions({
  WALL_POST_RECEIVED: (state, action) => {
    return WallState.update(state, {
      posts: {
        '$set': [action.payload, ...state.posts.slice(0, state.size - 1)]
      }
    });
  },
  WALL_RESIZED: (state, action) => {
    return WallState.update(state, {
      size: {
        '$set': action.payload
      }
    });
  }
}, new WallState({
  size: 10,
  posts: []
}));
