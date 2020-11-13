import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { removeBlog, updateBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch();

  const likeBlog = () => {
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  if (!blog) return null;

  return (
    <div>
      <h2 className="text-center pt-3">
        "{blog.title}" by {blog.author}
      </h2>
      <Container className="p-5">
        <a href={blog.url}>{blog.url}</a>
        <div>
          Likes {blog.likes}{' '}
          <Button variant="success" className="ml-2 py-1" onClick={likeBlog}>
            Like
          </Button>
        </div>
        Added by {blog.user && blog.user.name ? blog.user.name : 'anonym'}
        {user && blog.user && blog.user.username === user.username && (
          <Button className="ml-3 p-1" variant="outline-secondary" onClick={deleteBlog}>
            Remove
          </Button>
        )}
      </Container>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
