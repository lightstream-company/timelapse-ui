import React, { Component, PropTypes } from 'react';

class Canvas extends Component {

  getChildContext() {
    return {
      //context: this.refs.canvas.getContext('2d')
    };
  }

  render() {
    const children = this.context ? this.props.children : [];
    return <canvas ref="canvas">
      {children}
    </canvas>;
  }
}

Canvas.childContextTypes = {
  context: PropTypes.any
};

export default Canvas;
