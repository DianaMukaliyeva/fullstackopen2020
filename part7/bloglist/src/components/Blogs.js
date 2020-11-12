import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blogs = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      dispatch(setNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`));
    } catch (e) {
      dispatch(
        setNotification(
          'Could not create note, check fields or check if right user is logged in',
          true
        )
      );
    }
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      await blogService.update(blogToUpdate);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === blogToUpdate.id ? { ...blogToUpdate } : blog
      );
      setBlogs(updatedBlogs);
    } catch (e) {
      dispatch(setNotification('some error happened on updating blog', true));
    }
  };

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      const updatedBlogs = blogs.filter((blog) => (blog.id === blogId ? false : blog));
      setBlogs(updatedBlogs);
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
        <BlogForm addBlog={addBlog} />
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
