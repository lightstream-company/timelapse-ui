import React from 'react';
import color from 'color';
import './Layout.css';

export default function Layout(props) {
  const {width, height, children, background} = props;
  const formattedBackground =  '#' + background;
  const centerColor = color(formattedBackground).rgbString();
  const externaColor = color(formattedBackground).darken(0.15).rgbString();
  const marge = (height - (width / 2)) / 2;
  const layer = {
    height,
    width,
    background: `radial-gradient(ellipse at center, ${centerColor} 0%, ${externaColor} 100%)`
  };
  const content = {
    top: marge,
    left: 0,
    width,
    height: width / 2
  };
  const bg = {
    width,
    height: width / 2,
    backgroundImage: 'url(./world-map-black.png)'
  };
  const bottom = {
    bottom: 0,
    left: 0,
    height: marge,
    width
  };
  return <div className="Layout" style={layer}>
    <div style={content} className="content">
      <div className="bg" style={bg}></div>
      {children}
    </div>
    <div className="bottom" style={bottom}></div>
  </div>;
}
