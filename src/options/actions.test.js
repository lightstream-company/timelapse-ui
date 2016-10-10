/* global expect */
import { loadOptionsFromEnv } from './actions';

it('load options', () => {
  const win = {
    document: {
      location: {
        search: '?bgColor=333'
      }
    }
  };

  expect(loadOptionsFromEnv(win)).toEqual({
    type: 'LOAD_OPTIONS',
    payload: {
      bgColor: '333'
    }
  });

});

it('load options even if it doesnt exists', () => {
  expect(loadOptionsFromEnv(undefined)).toEqual({
    type: 'LOAD_OPTIONS',
    payload: {}
  });

});
