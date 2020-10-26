import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit with right values', () => {
  const addBlog = jest.fn();

  const component = render(<BlogForm addBlog={addBlog} />);

  const author = component.container.querySelector('[name="author"]');
  const title = component.container.querySelector('[name="title"]');
  const url = component.container.querySelector('[name="url"]');
  const form = component.container.querySelector('form');

  fireEvent.change(author, {
    target: { value: 'new author' },
  });
  fireEvent.change(title, {
    target: { value: 'new title' },
  });
  fireEvent.change(url, {
    target: { value: 'new url' },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('new title');
  expect(addBlog.mock.calls[0][0].author).toBe('new author');
  expect(addBlog.mock.calls[0][0].url).toBe('new url');
});
