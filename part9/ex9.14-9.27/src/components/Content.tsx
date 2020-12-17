import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Content: React.FC<{ content: CoursePart[] }> = ({ content }) => {
  const courseParts = content.map((part: CoursePart) => {
    switch (part.name) {
      case 'Fundamentals':
      case 'Using props to pass data':
      case 'Deeper type usage':
      case 'Example':
        return <Part key={part.name} part={part} />;
      default:
        return assertNever(part);
    }
  });

  return <>{courseParts}</>;
};

export default Content;
