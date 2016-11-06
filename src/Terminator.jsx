import React from 'react';
import {project} from 'equirectangular-projection';
import {truncate, antipode, solarPosition} from './terminator';

export default function Terminator(props) {
  const {width, height, time} = props;
  const solar = solarPosition(time);
  const [lng, lat] = truncate(antipode(solar));
  const pos = project(lng, lat, width);
  const style = Object.assign({
    fill: 'red'
  });
  return <svg {...{
      width,
      height,
      style: {
        position: 'absolute'
      }
    }}>
    <rect width="10" height="10" x={pos.left} y={pos.top} style={style} />
  </svg>;
}
