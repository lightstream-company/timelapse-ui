import React, { Component } from 'react';
import { renderer, createLightStructure } from 'tweetping-light-drawer';
import { project } from 'equirectangular-projection';

class Canvas extends Component {


  state = {
    imgs: []
  };

  componentWillReceiveProps(props) {

    const {point, width} = props;
    const {imageNumber, lightsByImage, color} = this.props;
    const height = Math.ceil(width / 2);

    if (!this.draw) {
      this.ctx = this.refs.canvas.getContext('2d');
      this.draw = renderer(this.ctx, {
        lineOpacity: 0.04,
        lineColor: color,
        pointColor: [255, 255, 255]
      });
    }

    if (point) {
      const {lng, lat} = point;
      const {left, top} = project(lng, lat, width);
      const light = createLightStructure(Math.round(left), Math.round(top));
      this.draw(light);

      if (!this.count) {
        this.count = 0;
      }
      this.count++;
      if (this.count % lightsByImage === 0) {
        this.setState({
          imgs: [{
            key: `${this.count - lightsByImage}-${this.count}`,
            base64: this.refs.canvas.toDataURL('image/png', 1)
          }, ...this.state.imgs.slice(0, imageNumber)]
        });
        this.ctx.clearRect(0, 0, width, height);
      }

    }

  }

  render() {
    const {width, imageNumber} = this.props;
    const height = Math.ceil(width / 2);
    const {imgs} = this.state;
    const style = {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'opacity 1s',
      width,
      height
    };
    return <div style={style}>
      {imgs.map((img, i) => {
        const {base64, key} = img;
        const opacity = (imageNumber - i) / imageNumber;
        const s = Object.assign({}, style, {
          opacity
        });
        return <img src={base64} width={width} height={height} alt="" style={s} key={key} />;
      })}
      <canvas ref="canvas" width={width} height={height}></canvas>
    </div>;
  }
}

export default Canvas;
