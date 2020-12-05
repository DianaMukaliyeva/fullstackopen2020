import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import BooksTable from './BooksTable';

const Books = ({ show }) => {
  const [selected, setSelected] = useState('all genres');
  const result = useQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks);
      setGenres([
        'all genres',
        ...new Set(
          result.data.allBooks.reduce(
            (result, book) => result.concat(book.genres.map((genre) => genre)),
            []
          )
        ),
      ]);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{selected}</b>
      </p>
      <BooksTable
        books={books.filter((book) =>
          selected === 'all genres' ? book : book.genres.includes(selected) ? book : null
        )}
      />
      {genres.map((genre, index) => (
        <button key={index} onClick={() => setSelected(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
