require('es6-promise').polyfill();
import './index.css';

import React from 'react';
import _ from 'lodash';
import raf from 'raf';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { fetchPoints, fetchRawPost, fetchWall, connection } from './api';
import options from './options/reducers';
import { loadOptionsFromEnv } from './options/actions';
import viewport from './viewport/reducers';
import wall from './wall/reducers';
import { viewportResized } from './viewport/actions';
import { wallResized, wallPostReceived, wallCleared } from './wall/actions';
import geo from './geo/reducers';
import { drawPoint } from './geo/actions';
import time from './time/reducers';
import { setTime } from './time/actions';


const reducers = combineReducers({
  options,
  viewport,
  wall,
  time,
  geo
});

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function dispatchResize() {
  store.dispatch(viewportResized(window.innerWidth, window.innerHeight));
}


dispatchResize();
window.addEventListener('resize', _.debounce(() => {
  dispatchResize();
  wallResized(window.innerWidth / 50);
  feedWall();
}, 250));

store.dispatch(loadOptionsFromEnv(window));

//store.subscribe(() => console.log('NEW STATE', store.getState()));

function getPostDate(post) {
  if (post.twp_source === 'instagram') {
    return parseInt(post.created_time, 0) * 1000;
  } else if (post.twp_source === 'twitter') {
    return new Date(post.created_at).getTime();
  }
}

const dispatchTime = _.throttle((time) => {
  store.dispatch(setTime(time));
}, 1000 / 24);

//const timer = 10000 / 15 / 60;
fetchPoints().then((json) => {
  const size = json.length;
  const lastId = json[0][0];
  const firstId = json[json.length - 1][0];
  Promise.all([
    fetchRawPost(firstId),
    fetchRawPost(lastId)
  ]).then((posts) => {
    const startAt = getPostDate(posts[0]);
    const endAt = Date.now(); //getPostDate(posts[1]);
    const delta = endAt - startAt;

    function consume(i) {
      const point = json[i];
      if (point) {
        const [id, lng, lat] = point; // eslint-disable-line no-unused-vars
        store.dispatch(drawPoint(lng, lat));
        dispatchTime(Math.round(startAt + delta * i / (size - 1)));
        raf(() => consume(i + 1), 18);
      //setTimeout(() => consume(i + 1), timer);
      } else {
        //raf(() => consume(0), 18);
        setInterval(() => dispatchTime(Date.now()), 1000);
      }
    }
    consume(0);
  });

});

function feedWall() {
  fetchWall(store.getState().wall.size).then((posts) => {
    store.dispatch(wallCleared());
    posts.forEach((post, i) => setTimeout(() => {
      store.dispatch(wallPostReceived(post));
    }, i * 200));
  });
}

feedWall();
connection.connect('wall', (post) => {
  store.dispatch(wallPostReceived(post));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
