import fetch from 'isomorphic-fetch';

const hostname = document.location.hostname.indexOf('tweetping') > -1 ? document.location.hostname : 'www.tweetping.net';
const streamId = document.location.hash.replace('#', '');


export function fetchJSON(url){
  return fetch(url).then((response) => response.json());
}

export function fetchPoints() {
  const url = `https://${hostname}/data/stream/${streamId}/geo/-180,-85.05,180,85.05?size=10000&condensed=true`;
  return fetchJSON(url);
}

