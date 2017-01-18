import { connect } from 'react-redux';
import Clock from './Clock.jsx';
import { getLightColorString } from './options/selector';

export default connect((state) => {
  return {
    color: getLightColorString(state),
    time: state.time
  };
})(Clock);
