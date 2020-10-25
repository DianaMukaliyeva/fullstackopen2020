import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 5000);
  }, [message]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const addNotification = (message, error) => {
    setError(error);
    setMessage(message);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      addNotification('wrong username or password', true);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      addNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`);
      return true;
    } catch (e) {
      addNotification('fields should not be empty', true);
      return false;
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

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'blogs'}</h2>
      <Notification message={message} error={error} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog">
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
      )}
    </div>
  );
};

export default App;
