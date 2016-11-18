import React from 'react';
import _ from 'lodash';
import { project } from 'equirectangular-projection';
import { antipode, solarPosition } from './terminator';
import * as d3 from 'd3-geo';


export default function Terminator(props) {
  const {width, height, time} = props;

  const solar = solarPosition(time);
  const [lng, lat] = antipode(solar);

  const circleGenerator = d3.geoCircle();

  circleGenerator.center([lng, lat]);
  circleGenerator.radius(90);

  const circle = circleGenerator();

  const points = _.sortBy(circle.coordinates[0], (coor) => coor[0]).map((coor) => {
    const {top, left} = project(coor[0], coor[1], width);
    return left + ' ' + top;
  });
  points.unshift('0 0');
  points.unshift(width + ' 0');

  return <svg {...{
      width,
      height,
      style: {
        position: 'absolute'
      }
    }}>
    <polygon points={points.join(', ')} style={{
      opacity: 0.3
    }}/>
  </svg>;
}
