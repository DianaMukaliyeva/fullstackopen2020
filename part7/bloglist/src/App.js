import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { getUsers } from './reducers/usersReducer';
import { initUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Navigation from './components/Navigation';
import { getBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const { user, users, blogs } = useSelector((state) => state);
  const userMatch = useRouteMatch('/users/:id');
  const blogMatch = useRouteMatch('/blogs/:id');
  const userInfo = userMatch ? users.find((u) => u.id === userMatch.params.id) : null;
  const blog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null;

  useEffect(() => {
    dispatch(initUser());
    dispatch(getUsers());
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="bg-light">
      <Navigation user={user} />
      <Container>
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <Switch>
            <Route path="/users/:id">
              <User user={userInfo} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <Blog user={user} blog={blog} />
            </Route>
            <Route path="/">
              <Blogs blogs={blogs} />
            </Route>
          </Switch>
        )}
      </Container>
    </div>
  );
};

export default App;
