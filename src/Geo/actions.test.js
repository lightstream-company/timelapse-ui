/* global expect */
import { drawPoint } from './actions';

it('draw point', () => {
  const action = drawPoint(20, 30);
  expect(action.payload.lng).toBe(20);
  expect(action.payload.lat).toBe(30);
});
