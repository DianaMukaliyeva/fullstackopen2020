import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../queries';
import BooksTable from './BooksTable';

const Recommend = ({ show, notify, booksResult }) => {
  const user = useQuery(ME);
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user.data && user.data.me) {
      setFavoriteGenre(user.data.me.favoriteGenre);
    }
  }, [user.data]);

  useEffect(() => {
    if (booksResult.data) {
      setBooks(
        booksResult.data.allBooks.filter((book) =>
          book.genres.includes(favoriteGenre) ? book : null
        )
      );
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
