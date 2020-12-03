import React, { useState } from 'react';

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

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{selected}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) =>
              selected === 'all genres' ? book : book.genres.includes(selected) ? book : null
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((genre, index) => (
        <button key={index} onClick={() => setSelected(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
