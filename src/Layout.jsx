import React from 'react';
import color from 'color';
import './Layout.css';

export default function Layout(props) {
  const {width, height, children, background} = props;
  const formattedBackground = /[0-9]{6,}/.test(background) ? '#' + background : background;
  const centerColor = color(formattedBackground).rgbString();
  const externaColor = color(formattedBackground).darken(0.1).rgbString();
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
    backgroundImage: 'url(./world-map-black.png)',
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
