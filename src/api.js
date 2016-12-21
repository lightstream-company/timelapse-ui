import createConnection from 'tweetping-connect';

const hostname = document.location.hostname.indexOf('tweetping') > -1 ? document.location.hostname : 'www.tweetping.net';
const streamId = document.location.hash.replace('#', '');

export const connection = createConnection(streamId, {
  hostname
});
const {load} = connection;

export function fetchPoints() {
  return load('geo/-180,-85.05,180,85.05', {
    query: {
      condensed: true,
      size: 10000
    }
  });
}

export function fetchRawPost(postId) {
  return load('raw/' + postId);
}

export function fetchWall(size) {
  return load('wall/', {
    query: {
      size
    }
  });
}
