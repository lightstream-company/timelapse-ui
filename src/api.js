import fetch from 'isomorphic-fetch';

const hostname = document.location.hostname.indexOf('tweetping') > -1  ? document.location.hostname : 'www.tweetping.net';
const streamId = document.location.hash.replace('#', '');

const url = `https://${hostname}/data/stream/${streamId}/geo/-180,-85.05,180,85.05?size=10000&condensed=true`;

export function fetchPoints(){
  return fetch(url).then((response) => response.json());
}
