require('es6-promise').polyfill();
import './index.css';

import React from 'react';
import _ from 'lodash';
import raf from 'raf';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { fetchPoints, fetchRawPost } from './api';
import options from './options/reducers';
import { loadOptionsFromEnv } from './options/actions';
import viewport from './Viewport/reducers';
import { viewportResized } from './Viewport/actions';
import geo from './Geo/reducers';
import { drawPoint } from './Geo/actions';
import time from './Time/reducers';
import { setTime } from './Time/actions';


const reducers = combineReducers({
  options,
  viewport,
  time,
  geo
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

function getPostDate(post) {
  if (post.twp_source === 'instagram') {
    return parseInt(post.created_time, 0) * 1000;
  }
}

//const timer = 10000 / 15 / 60;
fetchPoints().then((json) => {
  const firstId = json[0][0];
  const lastId = json[json.length - 1][0];
  Promise.all([
    fetchRawPost(firstId),
    fetchRawPost(lastId)
  ]).then((posts) => {
    const startAt = getPostDate(posts[0]);
    const endAt = getPostDate(posts[1]);
    const delta = endAt - startAt;

    function consume(i) {
      const point = json[i];
      if (point) {
        const [id, lng, lat] = point; // eslint-disable-line no-unused-vars
        store.dispatch(drawPoint(lng, lat));
        store.dispatch(setTime(Math.round(startAt + delta * i / 10000)));
        raf(() => consume(i + 1), 18);
      //setTimeout(() => consume(i + 1), timer);
      } else {
        //raf(() => consume(0), 18);
      }
    }
    consume(0);
  });

});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
