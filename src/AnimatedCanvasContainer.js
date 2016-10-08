import { connect } from 'react-redux';
import AnimatedCanvas from './AnimatedCanvas.jsx';

export default connect((state) => {
  return {
    point: state.geo.stream,
    width: state.viewport.width,
    height: state.viewport.width / 2
  };
})(AnimatedCanvas);
