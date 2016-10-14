import React, { Component } from 'react';

class Canvas extends Component {

  render() {
    return <canvas ref="canvas">
      {React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          getContext: () => {
            if(this.refs.canvas){
              return this.refs.canvas.getContext('2d');
            }
          }
        });
      })}
    </canvas>;
  }
}


export default Canvas;
