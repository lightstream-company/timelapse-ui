/* global expect */
import { viewportResized } from './actions';

it('viewport resize', () => {
  const action = viewportResized(200, 300);
  expect(action.payload.width).toBe(200);
  expect(action.payload.height).toBe(300);
});
