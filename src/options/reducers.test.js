/* global expect */
import { loadOptionsFromEnv } from './actions';
import reducers from './reducers';

it('load options', () => {
  const win = {
    document: {
      location: {
        search: '?bgColor=333'
      }
    }
  };
  expect(reducers(undefined, loadOptionsFromEnv(win))).toEqual({
    bgColor: '333'
  });

});
