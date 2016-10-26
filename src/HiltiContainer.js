import { connect } from 'react-redux';
import Hilti from './Hilti.jsx';

export default connect(state => {
  return Object.assign({}, state.viewport, state.hilti);
})(Hilti);
