import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  return (
    <p>
      {part.name} {part.exerciseCount}
    </p>
  );
};

export default Part;
