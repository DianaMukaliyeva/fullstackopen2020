import React from 'react';
import { coursePart } from '../types';

const Content: React.FC<{ content: coursePart[] }> = ({ content }) => {
  const courseParts = content.map((part: coursePart) => (
    <p key={part.name}>
      {part.name} {part.exerciseCount}
    </p>
  ));

  return <>{courseParts}</>;
};

export default Content;
