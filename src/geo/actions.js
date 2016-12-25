import {createAction} from 'redux-actions';

export const drawPoint = createAction('DRAW_POINT', (lng, lat) => {
  return {
    lng,
    lat
  };
});
