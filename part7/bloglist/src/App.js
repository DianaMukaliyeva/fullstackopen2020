import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, initUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'blogs'}</h2>
      <Notification />
      {user === null ? <LoginForm /> : <Blogs />}
    </div>
  );
};

export default App;
