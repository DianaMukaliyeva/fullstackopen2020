import React, { useState } from 'react';
import BooksTable from './BooksTable';

const Books = ({ show, result }) => {
  const [selected, setSelected] = useState('all genres');

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = books.reduce(
    (result, book) => result.concat(book.genres.map((genre) => genre)),
    []
  );
  genres.push('all genres');

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
