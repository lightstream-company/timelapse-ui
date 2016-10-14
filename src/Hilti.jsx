import React from 'react';
import './Hilti.css';

export default function Hilti(){
  return <div className="hilti">
    <h1>Hilti</h1>
    <div className="chf-count">
      <div className="main-count">1,000,000,000 CHF</div>
      <div className="buttons">
        <a href="#">Submit your guess</a>
        <a href="#">Learn more</a>
      </div>
    </div>
    <div className="orders">
      <strong>408</strong> order today
      <br />
      <strong>543,408</strong> this year
    </div>
  </div>;
}
