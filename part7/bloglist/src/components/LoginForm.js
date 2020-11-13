import React from 'react';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: username.value,
        password: password.value,
      })
    );
  };

  return (
    <Form className="text-center" onSubmit={onSubmit}>
      <Form.Group as={Row} className="justify-content-center">
        <Form.Label column sm="2">
          Username
        </Form.Label>
        <Col lg="3">
          <Form.Control id="username" {...username} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="justify-content-center">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col lg="3">
          <Form.Control id="password" {...password} />
        </Col>
      </Form.Group>
      <Button id="login-button" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
