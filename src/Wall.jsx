import './Wall.css';
import React from 'react';

export default function Wall(props){
  const {posts, color} = props;
  const size = posts.length;
  const style = {
    color:  color
  };
  return <div className="Wall" style={style}>
    {posts.map((post, i) => {
      const idx = size - i;
      const s = {
        top: i * 1.4 + 'em',
        opacity: idx / size
      };
      const img = {
        backgroundImage: `url(${post.user.profile_picture})`
      };
      return <p key={post._id} style={s}>
        <span className="pict" style={img}></span>
        {post.text}
      </p>;
    })}
  </div>;
}
