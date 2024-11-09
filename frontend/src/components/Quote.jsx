import React from 'react';

const Quote = ({ quote }) => {
  const parseTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <li>
      "{quote.message}" - {quote.name} {parseTime(quote.time)}
    </li>
  );
};

export default Quote;