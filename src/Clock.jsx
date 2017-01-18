import './Clock.css';
import React from 'react';

export default function Clock(props){
  const {time, color, width} = props;
  const radius = Math.ceil(width / 2);
  const date = new Date(time);
  const s = date.getSeconds() / 60;
  const m = (date.getMinutes() + s)/ 60;
  const h = (date.getHours() + m)/ 12;
  const ClockStyle = {
    border: `1px solid ${color}`,
    borderRadius: radius * 2,
    height: width,
    width
  };
  const minuteStyle = {
    backgroundColor: color,
    transform: `rotate(${m * 360 - 90}deg)`,
    width: radius * 0.8
  };
  const hourStyle = {
    backgroundColor: color,
    transform: `rotate(${h * 360 - 90}deg)`,
    width: radius * 0.7
  };
  const secondStyle = {
    backgroundColor: color,
    transform: `rotate(${s * 360 - 90}deg)`,
    width: radius * 0.98
  };
  const centerStyle = {
    backgroundColor: color
  };
  return <div className="Clock" style={ClockStyle}>
    <div className="minute spin" style={minuteStyle}></div>
    <div className="hour spin" style={hourStyle}></div>
    <div className="second spin" style={secondStyle}></div>
    <div className="center" style={centerStyle}></div>
  </div>;
}
