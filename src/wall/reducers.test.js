/* global expect */
import { wallPostReceived, wallResized } from './actions';
import reducers from './reducers';

it('should resize a wall', () => {
  const state = reducers(undefined, wallResized(3));
  expect(state.size).toEqual(3);
});

it('should stack a new post', () => {
  const state = reducers(undefined, wallPostReceived({
    text: 'yolo'
  }));
  expect(state.posts[0].text).toEqual('yolo');
});

it('should stack a cap at 10', () => {
  var state;
  state = reducers(undefined, wallResized(10));
  for(let i=0; i<15; i++){
    state = reducers(state, wallPostReceived({
      text: 'txt' + i
    }));
  }
  expect(state.posts.length).toEqual(10);
  expect(state.posts[0].text).toEqual('txt14');
});
