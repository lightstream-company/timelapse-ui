import './DigitDate.css';
import React from 'react';
import moment from 'moment';

const DATE_FORMAT = 'MMMM Do YYYY, HH:mm:ss';

export default function DateComponent(props){
  const {time, color} = props;
  const newStyle = {
    color
  };
  return <div className="DigitDate" style={newStyle}>
    {moment(time).format(DATE_FORMAT)}
  </div>;
}
