import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 5,
    user: {
      username: 'test',
      name: 'Test Test',
      id: '1',
    },
  };

  const username = 'test';
  const mockUpdate = jest.fn();
  const mockRemove = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove} username={username} />
    );
  });

  test('at start renders content of title and author, but not likes and url', () => {
    const div = component.container.querySelector('.blog');

    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);
    expect(div).not.toHaveTextContent(`likes ${blog.likes}`);
    expect(div).not.toHaveTextContent(blog.url);
  });

  test('after clicking the button, likes and url are shown', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.blog');
    expect(div).toHaveTextContent(`likes ${blog.likes}`);
    expect(div).toHaveTextContent(blog.url);
  });
});
