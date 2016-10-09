require('es6-promise').polyfill();
import './index.css';

import React from 'react';
import _ from 'lodash';
import raf from 'raf';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { fetchPoints } from './api';
import viewport from './Viewport/reducers';
import { viewportResized } from './Viewport/actions';
import geo from './Geo/reducers';
import { drawPoint } from './Geo/actions';


const reducers = combineReducers({
  viewport,
  geo
});


const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function dispatchResize() {
  store.dispatch(viewportResized(window.innerWidth, window.innerHeight));
}


dispatchResize();
window.addEventListener('resize', _.debounce(dispatchResize, 250));

//store.subscribe(() => console.log('NEW STATE', store.getState()));
//

//const timer = 10000 / 15 / 60;
fetchPoints().then((json) => {
  function consume(i) {
    const point = json[i];
    if (point) {
      const [id, lng, lat] = point; // eslint-disable-line no-unused-vars
      store.dispatch(drawPoint(lng, lat));
      raf(() => consume(i + 1), 18);
      //setTimeout(() => consume(i + 1), timer);
    } else {
      raf(() => consume(0), 18);
    }
  }
  consume(0);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
