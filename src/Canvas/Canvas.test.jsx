import React from 'react';
import Canvas from './Canvas.jsx';
import renderer from 'react-test-renderer';


function TestIfContextIsPassed(props) {
  if(typeof props.getContext !== 'function'){
    throw new Error('getContext missing in props');
  }
  return <span></span>;
}


it('should render with context', () => {

  renderer.create(<Canvas>
    <TestIfContextIsPassed />
  </Canvas>);

});
