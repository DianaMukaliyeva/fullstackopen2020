import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import Recommend from './components/Recommend';
import LoginForm from './components/LoginForm';
import { ALL_AUTHORS, LOGIN } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [message, setMessage] = useState({ content: '', error: false });
  const authors = useQuery(ALL_AUTHORS);
  const [token, setToken] = useState(null);
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.message, true);
    },
  });
  const client = useApolloClient();

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
      setPage('authors');
    }
  }, [result.data]); // eslint-disable-line

  const createNotification = (text, error = false) => {
    setMessage({ content: text, error });
    setTimeout(() => {
      setMessage({ content: '', error });
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notification message={message} />
      <LoginForm show={page === 'login'} login={login} />
      <Authors show={page === 'authors'} notify={createNotification} result={authors} />
      <Recommend show={page === 'recommend'} notify={createNotification} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} notify={createNotification} />
    </div>
  );
};

export default App;
