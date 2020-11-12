import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { getUsers } from './reducers/usersReducer';
import { initUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const match = useRouteMatch('/users/:id');
  const userInfo = match ? users.find((u) => u.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initUser());
    dispatch(getUsers());
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
        <>
          <p>{user.name} logged in</p>
          <p>
            <button onClick={logout}>logout</button>
          </p>
          <Switch>
            <Route path="/users/:id">
              <User user={userInfo} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
