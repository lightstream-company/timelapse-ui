import React, { Component } from 'react';
import _ from 'lodash';
import raf from 'raf';
import { renderer, createLightStructure, updateLightStructure } from 'tweetping-light-drawer';
import { project } from 'equirectangular-projection';


class AnimatedCanvas extends Component {

  componentDidMount(){
    raf(() => this.renderCanvas());
    this._mounted = true;
  }

  componentWillReceiveProps(props) {
    const {point, width, color} = props;
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


    if (point) {
      const {lng, lat} = point;
      const {left, top} = project(lng, lat, width);
      const light = createLightStructure(left, top, 7);


      this.lights.push(light);
      if (this.lights.length > lightsNumber) {
        this.lights.shift();
      }
    }
  }

  componentWillUnmount(){
    delete this._unmount;
  }

  renderCanvas(){
    const {width} = this.props;
    const height = Math.ceil(width / 2);
    this.ctx.clearRect(0, 0, width, height);
    if(this.lights){
      const size = this.lights.length;
      this.lights.forEach((light, i) => {
        updateLightStructure(light);
        const opacity = _.round(i/size * 0.5, 2);
        //console.log(opacity);
        //debugger;
        this.draw(light, opacity);
      });
    }
    if(this._mounted){
      raf(() => this.renderCanvas());
    }
  }

  render() {
    const {width} = this.props;
    const height = Math.ceil(width / 2);
    return <canvas ref="canvas" width={width} height={height}></canvas>;
  }
}

export default AnimatedCanvas;
