import React, { Component } from 'react';
import _ from 'lodash';
import { renderer, createLightStructure, updateLightStructure } from 'tweetping-light-drawer';
import { project } from 'equirectangular-projection';


class AnimatedCanvas extends Component {

  componentWillReceiveProps(props) {

    const {point, width, color} = props;
    const height = Math.ceil(width / 2);
    const {lightsNumber} = this.props;
    if (!this.lights) {
      this.lights = [];
    }

    if (!this.draw) {
      this.ctx = this.refs.canvas.getContext('2d');
      this.draw = renderer(this.ctx, {
        lineOpacity: 0.1,
        lineColor: color,
        pointColor: [255, 255, 255]
      });
    }

    this.ctx.clearRect(0, 0, width, height);

    if (point) {
      const {lng, lat} = point;
      const {left, top} = project(lng, lat, width);
      const light = createLightStructure(left, top, 7);


      this.lights.push(light);
      if (this.lights.length > lightsNumber) {
        this.lights.shift();
      }
      const size = this.lights.length;
      this.lights.forEach((light, i) => {
        updateLightStructure(light);
        const opacity = _.round(i/size * 0.5, 2);
        //console.log(opacity);
        //debugger;
        this.draw(light, opacity);
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
