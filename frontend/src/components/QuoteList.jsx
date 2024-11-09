import React from 'react';
import Quote from './Quote';

const QuoteList = ({ quotes, resetQuotes }) => {
  return (
    <div>
      <ul>
        {quotes.map((quote, index) => (
          <Quote key={index} quote={quote} />
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;