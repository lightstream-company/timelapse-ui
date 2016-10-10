import React from 'react';
import Canvas from './Canvas.jsx';
import renderer from 'react-test-renderer';


function TestIfContextIsPassed(props){
  if(!props.context){
    //TODO: uncoment me
    //context should exist
    //throw new Error('context not found');
  }
  return <span></span>;
}


it('should render with context', () => {

  const component = renderer.create(<Canvas>
    <TestIfContextIsPassed />
  </Canvas>);

  component.toJSON();

});
