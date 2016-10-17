import './Hilti.css';
import React from 'react';
import format from 'format-number';
import Monospacer from './Monospacer.jsx';

const formater = format();

export default function Hilti(props){
  const {globalCount, dailyOrder, annualOrder} = props;
  return <div className="hilti">
    <h1><img src="./logo.png" alt="Hilti" /></h1>
    <div className="chf-count">
      <div className="main-count">
        <Monospacer text={formater(globalCount)} /> CHF
      </div>
      <div className="buttons">
        <a href="#">Submit your guess</a>
        <a href="#">Learn more</a>
      </div>
    </div>
    <div className="orders">
      <strong>
        <Monospacer text={formater(dailyOrder)} />
      </strong> order today
      <br />
      <strong>
        <Monospacer text={formater(annualOrder)} />
      </strong> this year
    </div>
  </div>;
}
