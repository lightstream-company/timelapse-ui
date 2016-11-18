import React from 'react';
import { project } from 'equirectangular-projection';
import { normalizeLongitude } from './Geo/normalize';
import { antipode, solarPosition } from './terminator';


export default function Terminator(props) {
  const {width, height, time} = props;

  const solar = solarPosition(time);
  const [lng, lat] = antipode(solar);
  const {top, left} = project(normalizeLongitude(lng), lat, width);

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
    <rect width="10" height="10" x={left} y={top} style={style} />
  </svg>;
}
