import './App.css';
import React from 'react';
import Layout from './LayoutContainer';
import Canvas from './CanvasContainer';
import Marker from './MarkerContainer';
import Terminator from './TerminatorContainer';
import AnimatedCanvas from './AnimatedCanvasContainer';
import DigitDate from './DigitDateContainer';
import Clock from './ClockContainer';
import Wall from './WallContainer';

export default function App(){
  return <div>
    <h1>Hilti</h1>
    <Layout>
      <Terminator />
      <Canvas imageNumber={9} lightsByImage={1000} />
      <AnimatedCanvas lightsNumber={15} />
      <Marker />
      <DigitDate />
      <Clock width="51" />
      <Wall />
    </Layout>
  </div>;
}





















