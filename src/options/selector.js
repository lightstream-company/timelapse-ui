import { createSelector } from 'reselect';
import color from 'color';

export const getOptions = (state) => state.options;
export const getBgColor = (state) => state.options.bgColor;

export const getLightColor = createSelector([
  getBgColor
], (bgColor) => {
  const col = color('#' + bgColor);
  col.lighten(2.6);
  return col;
});

export const getLightColorArray = createSelector([
  getLightColor
], (col) => col.rgbArray());

export const getLightColorString = createSelector([
  getLightColor
], (col) => col.rgbString());
