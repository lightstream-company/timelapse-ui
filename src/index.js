require('es6-promise').polyfill();
import './index.css';

import React from 'react';
import _ from 'lodash';
import raf from 'raf';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { fetchHilti as fetchPoints, hiltiMapper } from './api';
import options from './options/reducers';
import { loadOptionsFromEnv } from './options/actions';
import viewport from './Viewport/reducers';
import { viewportResized } from './Viewport/actions';
import geo from './Geo/reducers';
import { drawPoint } from './Geo/actions';
import hilti from './Hilti/reducers';
import { setHiltiCounter } from './Hilti/actions';


const reducers = combineReducers({
  options,
  viewport,
  geo,
  hilti
});

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function dispatchResize() {
  store.dispatch(viewportResized(window.innerWidth, window.innerHeight));
}


dispatchResize();
window.addEventListener('resize', _.debounce(dispatchResize, 250));

store.dispatch(loadOptionsFromEnv(window));

//store.subscribe(() => console.log('NEW STATE', store.getState()));


const ONE_DAY = 1000 * 60 * 60 * 24;


function streamArray(json) {

  const {StartValue, SalesAmount, OrderValue, OrderAmount} = json;
  const array = hiltiMapper(json);

  function dispatchValues(coef) {
    const currentOrderAmmount = Math.round(OrderAmount * coef);
    store.dispatch(setHiltiCounter({
      globalCount: StartValue + Math.round(SalesAmount * coef),
      dailyOrder: currentOrderAmmount,
      annualOrder: OrderValue + currentOrderAmmount
    }));
  }

 //const animationTime = Math.round(json.Duration * 1000 / array.length);
 const animationTime = Math.round(1000 / 26);

  return new Promise(resolve => {
    function nextFrame(i) {
      const before = Date.now();
      raf(() => {
        const delta = before - Date.now();
        setTimeout(() => {
          consume(i);
        }, Math.max(1, animationTime - delta));
      });
    }

    function consume(i) {
      const point = array[i];
      if (point) {
        const [id, lng, lat] = point; // eslint-disable-line no-unused-vars
        if (typeof lng === 'number' && typeof lat === 'number') {
          store.dispatch(drawPoint(lng, lat));
        } else {
          console.error(id, 'bad coordinates', lat, lng);
        }
        const now = Date.now();
        const msToday = now % ONE_DAY;
        const coef = msToday / ONE_DAY;
        dispatchValues(coef);
        nextFrame(i + 1);
      //setTimeout(() => consume(i + 1), 90);
      } else {
        resolve();
        nextFrame(0);
      }
    }
    consume(0);
  });
}

fetchPoints().then(streamArray);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
