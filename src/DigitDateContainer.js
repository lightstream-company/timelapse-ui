import { connect } from 'react-redux';
import DigitDate from './DigitDate.jsx';
import { getLightColorString } from './options/selector';

export default connect(state => {
  return {
    color: getLightColorString(state),
    time: state.time
  };
})(DigitDate);
