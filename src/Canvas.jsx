import React, { Component } from 'react';
import { renderer, createLightStructure } from 'tweetping-light-drawer';
import { project } from 'equirectangular-projection';

class Canvas extends Component {


  state = {
    base64: []
  };

  componentWillReceiveProps(props) {

    const {point, width, height} = props;
    const {imageNumber, lightsByImage} = this.props;

    if (!this.draw) {
      this.ctx = this.refs.canvas.getContext('2d');
      this.draw = renderer(this.ctx);
    }

    if (point) {
      const {lng, lat} = point;
      const {left, top} = project(lng, lat, width);
      const light = createLightStructure(left, top);
      this.draw(light);

      if (!this.count) {
        this.count = 0;
      }
      this.count++;
      if (this.count % lightsByImage === 0) {
        this.setState({
          base64: [
            this.refs.canvas.toDataURL('image/png', 1),
            ...this.state.base64.slice(0, imageNumber)
          ]
        });
        this.ctx.clearRect(0, 0, width, height);
      }

    }

  }

  render() {
    const {width, height, imageNumber} = this.props;
    const {base64} = this.state;
    const style = {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height
    };
    return <div style={style}>
      {base64.map((src, i) => {
        const s = Object.assign({}, style, {
          opacity: (imageNumber - i) / imageNumber
        });
        return <img src={src} width={width} height={height} alt="" style={s} key={i} />;
      })}
      <canvas ref="canvas" width={width} height={height}></canvas>
    </div>;
  }
}

export default Canvas;
