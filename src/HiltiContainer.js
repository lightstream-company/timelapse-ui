import { connect } from 'react-redux';
import Hilti from './Hilti.jsx';

export default connect(state => state.hilti)(Hilti);
