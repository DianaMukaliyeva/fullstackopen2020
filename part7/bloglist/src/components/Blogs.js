import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { getBlogs } from '../reducers/blogReducer';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blogs = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, [blogs, dispatch]);

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      await blogService.update(blogToUpdate);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === blogToUpdate.id ? { ...blogToUpdate } : blog
      );
    } catch (e) {
      dispatch(setNotification('some error happened on updating blog', true));
    }
  };

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      const updatedBlogs = blogs.filter((blog) => (blog.id === blogId ? false : blog));
      //   setBlogs(updatedBlogs);
      dispatch(setNotification('blog was successfully deleted'));
    } catch (e) {
      dispatch(setNotification('could not delete this blog', true));
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <div>
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm hideForm={toggleVisibility} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            username={user.username}
          />
        ))}
    </div>
  );
};

Blogs.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blogs;
