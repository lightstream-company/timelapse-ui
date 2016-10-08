import React, { Component } from 'react';
import { renderer, createLightStructure, updateLightStructure } from 'tweetping-light-drawer';
import { project } from 'equirectangular-projection';

class AnimatedCanvas extends Component {


  componentWillReceiveProps(props) {

    const {point, width} = props;
    const height = Math.ceil(width / 2);
    const {lightsNumber} = this.props;
    if (!this.lights) {
      this.lights = [];
    }

    if (!this.draw) {
      this.ctx = this.refs.canvas.getContext('2d');
      this.draw = renderer(this.ctx, {
        lineOpacity: 0.2
      });
    }

    this.ctx.clearRect(0, 0, width, height);

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
    const {width} = this.props;
    const height = Math.ceil(width / 2);
    return <canvas ref="canvas" width={width} height={height}></canvas>;
  }
}

export default AnimatedCanvas;
