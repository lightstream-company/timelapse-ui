import './Marker.css';
import React from 'react';
import { project } from 'equirectangular-projection';

export default function Marker(props){
  const {point, width} = props;
  const {lng, lat} = point;
  //const height =  Math.ceil(width/2);
  const {top, left} = project(lng, lat, width);
  const style = {
    transform: `translate3d(${left}px,${top}px,0px)`
  };
  return <div className="map-marker" style={style}>
    {Math.round(Math.random() * 1000000000)/100}
  </div>;
}


