import createConnection from 'tweetping-connect';

const hostname = document.location.hostname.indexOf('tweetping') > -1 ? document.location.hostname : 'www.tweetping.net';
const streamId = document.location.hash.replace('#', '');

const {load} = createConnection(streamId, {
  hostname
});

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

