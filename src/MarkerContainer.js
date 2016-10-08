import {connect} from 'react-redux';
import Marker from './Marker.jsx';

export default connect((state)=> {
  return {
    point: state.geo.stream,
    width: state.viewport.width
  };
})(Marker);
