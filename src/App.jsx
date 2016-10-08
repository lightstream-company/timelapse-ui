import React from 'react';
import Layout from './LayoutContainer';
import Canvas from './CanvasContainer';
import AnimatedCanvas from './AnimatedCanvasContainer';

export default function App(){
  return <div>
    <h1>Hilti</h1>
    <Layout background="#555">
      <Canvas imageNumber={30} lightsByImage={100} />
      <AnimatedCanvas lightsNumber={75} />
    </Layout>
  </div>;
}





















