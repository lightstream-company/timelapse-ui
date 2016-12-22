import './Wall.css';
import React from 'react';

export default function Wall(props){
  const {posts, color} = props;
  const size = posts.length;
  const style = {
    color:  color,
    height: size * 1.4 + 'em'
  };
  return <div className="Wall" style={style}>
    {posts.map((post, i) => {
      const idx = size - i;
      const s = {
        top: i * 1.4 + 'em',
        opacity: idx / size
      };
      return <p key={post._id} style={s}>{post.text}</p>;
    })}
  </div>;
}
