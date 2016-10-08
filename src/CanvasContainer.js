import { connect } from 'react-redux';
import Canvas from './Canvas.jsx';

export default connect((state) => ({
  point: state.geo.stream,
  width: state.viewport.width,
  height: state.viewport.width / 2
}))(Canvas);
