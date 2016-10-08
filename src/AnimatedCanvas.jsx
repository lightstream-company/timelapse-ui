import React, { Component } from 'react';
import { renderer, createLightStructure, updateLightStructure } from 'tweetping-light-drawer';
import { project } from 'equirectangular-projection';

class AnimatedCanvas extends Component {


  componentWillReceiveProps(props) {

    const {point, width} = props;
    const {lightsNumber} = this.props;
    if (!this.lights) {
      this.lights = [];
    }

    if (!this.draw) {
      this.ctx = this.refs.canvas.getContext('2d');
      this.draw = renderer(this.ctx);
    }

    this.ctx.clearRect(0, 0, width, width/2);

    if (point) {
      const {lng, lat} = point;
      const {left, top} = project(lng, lat, width);
      const light = createLightStructure(left, top);


      this.lights.push(light);
      if (this.lights.length > lightsNumber) {
        this.lights.shift();
      }
      this.lights.forEach(light => {
        updateLightStructure(light);
        this.draw(light);
      });
    }
  }

  render() {
    const {width, height} = this.props;
    return <canvas ref="canvas" width={width} height={height}></canvas>;
  }
}

export default AnimatedCanvas;
