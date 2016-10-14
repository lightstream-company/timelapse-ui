import { connect } from 'react-redux';
import Layout from './Layout.jsx';

export default connect(state => {
  return {
    width: state.viewport.width,
    height: state.viewport.height
  };
})(Layout);
