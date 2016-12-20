import Terminator from './Terminator.jsx';
import { connect } from 'react-redux';
import { margin } from './Viewport/selector';

export default connect((state) => {
  return {
    width: state.viewport.width,
    marge: margin(state),
    time: state.time
  };
})(Terminator);
