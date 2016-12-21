import t from 'tcomb';

export const WallPost = t.Any;

export const WallPosts = t.list(WallPost);

export const WallState = t.struct({
  posts: WallPosts,
  size: t.Number
});
