import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm hideForm={toggleVisibility} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Blogs;
