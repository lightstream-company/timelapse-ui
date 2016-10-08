import React from 'react';
import './world-map-black.png';
import './Layout.css';

export default function Layout(props) {
  const {width, height, children, background} = props;
  const marge = (height - (width / 2)) / 2;
  const layer = {
    height,
    width,
    background: background
  };
  const content = {
    top: marge,
    left: 0,
    width,
    height: width / 2
  };
  const bottom = {
    bottom: 0,
    left: 0,
    height: marge,
    width
  };
  return <div className="Layout" style={layer}>
    <div style={content} className="content">
      {children}
    </div>
    <div className="bottom" style={bottom}></div>
  </div>;
}
