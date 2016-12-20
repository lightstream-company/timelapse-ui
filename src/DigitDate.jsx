import './DigitDate.css';
import React from 'react';
import moment from 'moment';

const DATE_FORMAT = 'MMMM Do YYYY, HH:mm a';

export default function DigitDate({time, color, style}){
  const newStyle = Object.assign({
    color
  }, style);
  return <div className="DigitDate" style={newStyle}>
    {moment(time).format(DATE_FORMAT)}
  </div>;
}
