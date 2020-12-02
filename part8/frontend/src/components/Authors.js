import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Select from 'react-select';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const Authors = ({ show, result, notify }) => {
  const [year, setYear] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [changeBirthYear, someResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.message, true);
    },
  });

  useEffect(() => {
    if (someResult.data && someResult.data.editAuthor === null) {
      notify('author not found', true);
    } else if (someResult.data && someResult.data.editAuthor) {
      notify('author birth year updated');
    }
  }, [someResult.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  const options = authors.map((author) => {
    return {
      label: author.name,
    };
  });

  const updateBirthYear = (event) => {
    event.preventDefault();
    if (!selectedOption) {
      notify('choose author', true);
      return;
    }
    changeBirthYear({ variables: { name: selectedOption.label, born: parseInt(year) } });
    setYear('');
    setSelectedOption(null);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={updateBirthYear}>
        <Select
          options={options}
          value={selectedOption}
          onChange={(val) => setSelectedOption(val)}
        />
        <div>
          <label>born:</label>
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}></input>
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
