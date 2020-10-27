import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteButtonStyle = {
    backgroundColor: 'blue',
    borderRadius: '5px',
  };

  const likeBlog = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          {blog.user && blog.user.username === username && (
            <button style={deleteButtonStyle} onClick={deleteBlog}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Blog;
