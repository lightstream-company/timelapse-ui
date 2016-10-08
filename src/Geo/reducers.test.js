/* global expect */
import { drawPoint } from './actions';
import reducers from './reducers';

it('stream point', () => {
  expect(reducers(undefined, drawPoint(20, 30))).toEqual({
    stream:{
      lng: 20,
      lat: 30
    }
  });

  expect(reducers(undefined, drawPoint(50, 50))).toEqual({
    stream:{
      lng: 50,
      lat: 50
    }
  });
});
