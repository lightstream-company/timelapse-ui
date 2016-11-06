import Terminator from './Terminator.jsx';
import { connect } from 'react-redux';

export default connect((state) => {
  return {
    width: state.viewport.width,
    height: state.viewport.height
  };
})(Terminator);
