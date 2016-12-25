/* global expect */
import { viewportResized } from './actions';
import reducers from './reducers';

it('viewport resize', () => {
  expect(reducers(undefined, viewportResized(200, 300))).toEqual({
    width: 200,
    height: 300
  });
});
