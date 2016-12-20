import React from 'react';
import moment from 'moment';


const DATE_FORMAT = 'MMMM Do YYYY, HH:mm a';

export default function DateComponent({time, color, style}){
  const newStyle = Object.assign({
    color
  }, style);
  return <div style={newStyle}>
    {moment(time).format(DATE_FORMAT)}
  </div>;
}
