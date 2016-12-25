import { createSelector } from 'reselect';

export const getWidth = (state) => state.viewport.width;
export const getHeight = (state) => state.viewport.height;

export const margin = createSelector([
  getWidth,
  getHeight
], (width, height) => (height - (width / 2)) / 2);


