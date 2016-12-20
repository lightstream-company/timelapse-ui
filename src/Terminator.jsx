import React from 'react';
import _ from 'lodash';
import { project, projectLat } from 'equirectangular-projection';
import { antipode, solarPosition } from './terminator';
import * as d3 from 'd3-geo';


export default function Terminator(props) {
  const {width, time} = props;

  const solar = solarPosition(time);
  const [lng, lat] = antipode(solar);

  const circleGenerator = d3.geoCircle();

  circleGenerator.center([lng, lat]);
  circleGenerator.radius(90);

  const circle = circleGenerator();

  const sorted =  _.sortBy(circle.coordinates[0], (coor) => coor[0]);
  const points = sorted.map((coor) => {
    const {top, left} = project(coor[0], coor[1], width);
    return left + ' ' + top;
  });
  const outsideY = projectLat(sorted[0][1], width / 2);
  points.unshift('-30 ' + outsideY);
  points.unshift('0 0');
  points.unshift(width + ' 0');
  points.unshift((width + 30)+ ' ' + outsideY);

  return <svg {...{
      width,
      height: width / 2,
      style: {
        position: 'absolute'
      }
    }}>
    <polygon points={points.join(', ')} style={{
      opacity: 0.25
    }}/>
  </svg>;
}
