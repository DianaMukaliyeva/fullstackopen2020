import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'blogs'}</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <Router>
          <p>{user.name} logged in</p>
          <p>
            <button onClick={logout}>logout</button>
          </p>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
