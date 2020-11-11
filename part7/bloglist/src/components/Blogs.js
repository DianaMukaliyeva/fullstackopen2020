import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blogs = ({ addNotification, user, setUser }) => {
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
      addNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`);
    } catch (e) {
      addNotification(
        'Could not create note, check fields or check if right user is logged in',
        true
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
      addNotification('some error happened on updating blog', true);
    }
  };

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      const updatedBlogs = blogs.filter((blog) => (blog.id === blogId ? false : blog));
      setBlogs(updatedBlogs);
      addNotification('blog was successfully deleted');
    } catch (e) {
      addNotification('could not delete this blog', true);
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
  addNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blogs;
