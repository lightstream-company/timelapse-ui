import { connect } from 'react-redux';
import AnimatedCanvas from './AnimatedCanvas.jsx';
import { getLightColorArray } from './options/selector';

export default connect((state) => {
  return {
    color: getLightColorArray(state),
    point: state.geo.stream,
    width: state.viewport.width,
    height: state.viewport.width / 2
  };
})(AnimatedCanvas);
