import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducer';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(logoutUser());
  };

  if (!user) return <h2 className="text-center p-5">Log in to application</h2>;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="p-2 text-white text-decoration-none" to="/">
            Blog app
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="p-2" to="/">
            Blogs
          </Link>
          <Link className="p-2" to="/users">
            Users
          </Link>
        </Nav>
        <span className="p-2 text-white">{user.name} logged in</span>
        <Button variant="outline-light" onClick={logout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Navigation;
