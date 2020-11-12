import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      dispatch(setNotification('wrong username or password', true));
    }
  };

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'blogs'}</h2>
      <Notification />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <Blogs user={user} setUser={setUser} />
      )}
    </div>
  );
};

export default App;
