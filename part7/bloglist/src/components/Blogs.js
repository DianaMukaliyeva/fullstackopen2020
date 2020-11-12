import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../reducers/blogReducer';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, user } = useSelector((state) => state);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm hideForm={toggleVisibility} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={user.username} />
        ))}
    </div>
  );
};

export default Blogs;
