import { createSelector } from 'reselect';
import color from 'color';

export const getOptions = (state) => state.options;
export const getBgColor = (state) => state.options.bgColor;

export const getLightColorArray = createSelector([
  getBgColor
], (bgColor) => {
  const col = color('#' + bgColor);
  return col.lighten(2.6).rgbArray();
});
