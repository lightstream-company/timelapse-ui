require('es6-promise').polyfill();
import './index.css';

import React from 'react';
import _ from 'lodash';
import raf from 'raf';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { decimal } from './utils';
import App from './App.jsx';
import { fetchPoints, hiltiMapper } from './Hilti/api';
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

const ONE_DAY = 1000 * 60 * 60 * 24;

function streamArray(json) {

  const {StartValue, SalesAmount, OrderValue, OrderAmount, StartDate} = json;
  const array = hiltiMapper(json);

  function dispatchValues(coef) {
    store.dispatch(setHiltiCounter({
      globalCount: StartValue + Math.round(SalesAmount * coef),
      dailyOrder: Math.round(OrderAmount * decimal(coef)),
      annualOrder: OrderValue + Math.round(OrderAmount * coef)
    }));
  }

  const start = new Date(StartDate || '2016-10-25T00:00:00Z').getTime();
  return new Promise(resolve => {
    function nextFrame(i) {
      raf(() => {
        consume(i);
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
        const coef = (now - start) / ONE_DAY;
        dispatchValues(coef);
        nextFrame(i + 1);
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
