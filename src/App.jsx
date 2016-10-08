import React from 'react';
import Layout from './LayoutContainer';
import Canvas from './CanvasContainer';
import Marker from './MarkerContainer';
import AnimatedCanvas from './AnimatedCanvasContainer';

export default function App(){
  return <div>
    <h1>Hilti</h1>
    <Layout background="#555">
      <Canvas imageNumber={30} lightsByImage={200} />
      <AnimatedCanvas lightsNumber={35} />
      <Marker />
    </Layout>
  </div>;
}





















