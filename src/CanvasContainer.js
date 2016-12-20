import { connect } from 'react-redux';
import Canvas from './Canvas.jsx';
import { getLightColorArray } from './options/selector';

export default connect((state) => ({
  color: getLightColorArray(state),
  point: state.geo.stream,
  width: state.viewport.width
}))(Canvas);
