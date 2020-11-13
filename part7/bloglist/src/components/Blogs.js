import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef();

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div className="mb-5">
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm hideForm={toggleVisibility} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <ListGroup.Item variant="dark" action key={blog.id}>
              {blog.title} {blog.author}
            </ListGroup.Item>
          </Link>
        ))}
    </div>
  );
};

export default Blogs;
