import React from 'react';
import './Hilti.css';

export default function Hilti(props){
  const {globalCount, dailyOrder, annualOrder} = props;
  return <div className="hilti">
    <h1><img src="./logo.png" alt="Hilti" /></h1>
    <div className="chf-count">
      <div className="main-count">{globalCount} CHF</div>
      <div className="buttons">
        <a href="#">Submit your guess</a>
        <a href="#">Learn more</a>
      </div>
    </div>
    <div className="orders">
      <strong>{dailyOrder}</strong> order today
      <br />
      <strong>{annualOrder}</strong> this year
    </div>
  </div>;
}
