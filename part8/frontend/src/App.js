import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [message, setMessage] = useState({ content: '', error: false });
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const createNotification = (text, error = false) => {
    setMessage({ content: text, error });
    setTimeout(() => {
      setMessage({ content: '', error });
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notification message={message} />

      <Authors show={page === 'authors'} notify={createNotification} result={authors} />

      <Books show={page === 'books'} result={books} />

      <NewBook show={page === 'add'} notify={createNotification} />
    </div>
  );
};

export default App;
