import React from 'react';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

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
    <form onSubmit={onSubmit}>
      <div>
        username
        <input id="username" {...username} />
      </div>
      <div>
        password
        <input id="password" {...password} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
