import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      return state.map((an) => (an.id !== id ? an : action.data));
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  });
};

export const addVote = (anecdote) => async (dispatch) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const updatedAnecdote = await anecdoteService.update(votedAnecdote);
  dispatch({
    type: 'VOTE',
    data: updatedAnecdote,
  });
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
  });
};

export default anecdoteReducer;
