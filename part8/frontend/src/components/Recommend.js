import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';
import BooksTable from './BooksTable';

const Recommend = ({ show, notify }) => {
  const user = useQuery(ME);
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [books, setBooks] = useState([]);
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      notify(error.message, true);
    },
  });

  useEffect(() => {
    if (user.data && user.data.me) {
      setFavoriteGenre(user.data.me.favoriteGenre);
      getBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [user.data, getBooks]);

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [favoriteGenre, booksResult]);

  if (!show) {
    return null;
  }

  if (user.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      <BooksTable books={books} />
    </div>
  );
};

export default Recommend;
