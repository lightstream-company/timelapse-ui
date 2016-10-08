import {createAction} from 'redux-actions';

export const viewportResized = createAction('VIEWPORT_RESIZED', (width, height) => {
  return {
    width,
    height
  };
});
