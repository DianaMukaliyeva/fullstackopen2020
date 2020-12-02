import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Select from 'react-select';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const Authors = ({ show, result }) => {
  const [year, setYear] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

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
    changeBirthYear({ variables: { name: selectedOption, born: parseInt(year) } });
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
          onChange={(val) => setSelectedOption(val.label)}
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
