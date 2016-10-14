import React from 'react';
import Layout from './LayoutContainer';
import Canvas from './CanvasContainer';
import Marker from './MarkerContainer';
import Hilti from './HiltiContainer';
import AnimatedCanvas from './AnimatedCanvasContainer';

export default function App(){
  return <div>
    <Layout background="#867c6b">
      <Canvas imageNumber={5} lightsByImage={1000} />
      <AnimatedCanvas lightsNumber={20} />
      <Marker />
      <Hilti />
    </Layout>
  </div>;
}





















