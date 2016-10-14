require('es6-promise').polyfill();
import './index.css';

import React from 'react';
import _ from 'lodash';
import raf from 'raf';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { fetchHilti as fetchPoints } from './api';
import options from './options/reducers';
import { loadOptionsFromEnv } from './options/actions';
import viewport from './Viewport/reducers';
import { viewportResized } from './Viewport/actions';
import geo from './Geo/reducers';
import { drawPoint } from './Geo/actions';
import hilti from './Hilti/reducers';


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

function streamArray(array) {
  //const timer = Math.round((15 * 60 * 1000) / array.length);
  return new Promise(resolve => {
    function consume(i) {
      const point = array[i];
      if (point) {
        const [id, lng, lat] = point; // eslint-disable-line no-unused-vars
        store.dispatch(drawPoint(lng, lat));
        raf(() => consume(i + 1), 18);
        //setTimeout(() => consume(i + 1), 90);
      } else {
        resolve();
        raf(() => consume(0), 18);
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
