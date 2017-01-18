import './DigitDate.css';
import React from 'react';
import moment from 'moment';

export default function DateComponent(props){
  const {time, color} = props;
  const newStyle = {
    color
  };
  return <div className="DigitDate" style={newStyle}>
    {moment(time).format('dddd')}
    <br />
    {moment(time).format('MMMM Do, YYYY')}
    <br />
    {moment(time).format('HH:mm')}
  </div>;
}
