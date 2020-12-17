import React from 'react';

const Total: React.FC<{ amount: number }> = ({ amount }) => {
  return <p>Number of exercises {amount}</p>;
};

export default Total;
