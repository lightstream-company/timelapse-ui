import React from 'react';

function isNumber(value) {
  return isNaN(parseInt(value, 10));
}

export default function Monospacer({text, width, filter}) {
  const validate = filter || isNumber;
  return <span>
    {text.split('').map((c, i) => {
      const style = validate(c) ? {} : {
        display: 'inline-block',
        textAlign: 'center',
        width: width || '0.4em'
      };
      return <span key={i} style={style}>{c}</span>;
    })}
  </span>;
}
