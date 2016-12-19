import t from 'tcomb';
import * as tt from 'tcomb-form-types';

function checkColorLength(str) {
  return str.length === 6 || str.length === 3;
}

export const ColorCode = t.refinement(tt.String.AlphaNumeric, checkColorLength, 'ColorCode');

export const Options = t.struct({
  bgColor: ColorCode
});
