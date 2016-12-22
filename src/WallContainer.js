import { connect } from 'react-redux';
import { getLightColorString } from './options/selector';
import Wall from './Wall.jsx';

export default connect((state) => {
  return {
    color: getLightColorString(state),
    posts: state.wall.posts
  };
})(Wall);
