import React from 'react';
import Layout from './LayoutContainer';
import Canvas from './CanvasContainer';
import Marker from './MarkerContainer';
import Terminator from './TerminatorContainer';
import AnimatedCanvas from './AnimatedCanvasContainer';

export default function App(){
  return <div>
    <h1>Hilti</h1>
    <Layout>
      <Terminator />
      <Canvas imageNumber={5} lightsByImage={1000} />
      <AnimatedCanvas lightsNumber={15} />
      <Marker />
    </Layout>
  </div>;
}





















