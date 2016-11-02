import './Hilti.css';
import React, { Component } from 'react';
import format from 'format-number';
import Monospacer from './Monospacer.jsx';
import Modal from 'react-modal';

const formater = format();

export default class Hilti extends Component {
  state = {
    modalIsOpen: false
  }
  setModelState(e, modalIsOpen) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      modalIsOpen
    });
  }
  open(e) {
    this.setModelState(e, true);
  }
  close(e) {
    this.setModelState(e, false);
  }
  render() {
    const {globalCount, dailyOrder, annualOrder, width, height} = this.props;
    const {modalIsOpen} = this.state;
    const h = 490;
    const w = 590;
    const verticalMarge = Math.max((height - h) / 2, 0);
    const horizontalMarge = Math.max((width - w) / 2, 0);
    const style = {
      content: {
        top: verticalMarge,
        bottom: verticalMarge,
        left: horizontalMarge,
        right: horizontalMarge,
        background: 'rgba(0,0,0,0.7)'
      },
      overlay: {
        background: 'rgba(0,0,0,0.2)'
      }
    };
    const modalProps = {
      isOpen: modalIsOpen,
      onRequestClose: () => this.close(),
      style
    };
    return <div className="hilti">
      <h1><img src="./logo.jpg" width="140" alt="Hilti" /></h1>
      <div className="chf-count">
        <div className="main-count">
          <Monospacer text={formater(globalCount)} /> CHF
        </div>
        <div className="explain">
          When do you think we will hit the billion?
        </div>
        <div className="buttons">
          <a target="_blank" href="https://form.hilti.com/form-15830/RD-Digital-1B-CHF">Submit your guess</a>
          <a href="#" onClick={(e) => this.open(e)}>Learn more</a>
        </div>
      </div>
      <div className="orders">
        <strong>
          <Monospacer text={formater(dailyOrder)} />
        </strong> e-business orders today
        <br />
        <strong>
          <Monospacer text={formater(annualOrder)} />
        </strong> e-business orders this year
      </div>
      <Modal {...modalProps}>
        <div className="close" onClick={(e) => this.close(e)}>×</div>
        <h1>Learn More</h1>
        <p>
          As part of our push towards 1 billion CHF in online sales, we would like to give you the chance to win prizes. You can win by <strong>guessing</strong> when and where we will hit the billion and by <strong>selling</strong> via online channels.<br />
          <br />
          Submit <strong>when and where you think the order that will take us to the billion will be placed</strong>. The winner will be the person that submits the guess closest to the actual date and location of the order. Everyone is welcome to participate.<br />
          <br />
          <strong>All sales people are also automatically enrolled in a global sales competition</strong>. There will be one winner per HUB and MO. The winner will be the person that sells most, in absolute numbers, via our online channels. Competition will close December 2nd. Only one guess per person.
          <br />
          For prizes please see and join Yammer group: Hilti e-billion
        </p>
      </Modal>
    </div>;
  }
}
