import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote, create } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };

  const createAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = '';
    dispatch(create(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
