import t from 'tcomb';
import * as tt from 'tcomb-form-types';

export const Options = t.struct({
  bgColor: tt.String.HexColor
});
