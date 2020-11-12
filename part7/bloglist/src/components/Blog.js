import React from 'react';
import { useDispatch } from 'react-redux';
import { removeBlog, updateBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch();

  const deleteButtonStyle = {
    backgroundColor: 'blue',
    borderRadius: '5px',
  };

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
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} <button onClick={likeBlog}>like</button>
      </div>
      added by {blog.user.name ? blog.user.name : blog.user.username}
      {user && blog.user.username === user.username && (
        <button style={deleteButtonStyle} onClick={deleteBlog}>
          remove
        </button>
      )}
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
