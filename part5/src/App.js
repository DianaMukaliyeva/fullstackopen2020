import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

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

  const addNotification = (message, error) => {
    setError(error);
    setMessage(message);
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      addNotification('wrong username or password', true);
    }
  };

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'blogs'}</h2>
      <Notification message={message} error={error} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <Blogs user={user} setUser={setUser} addNotification={addNotification} />
      )}
    </div>
  );
};

export default App;
