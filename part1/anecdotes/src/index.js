import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, title }) => (
    <button onClick={handleClick}>{title}</button>
)

const Anecdote = ({ votes, content }) => {
    return (
        <div>
            <div>{content}</div>
            <div>has {votes} votes</div>
        </div>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
    const getRandom = (maxValue) => Math.floor(Math.random() * maxValue);

    const vote = () => {
        const copy = [...points];
        copy[selected]++;
        setPoints(copy);
    }

    const getPopular = () => {
        const maxPoint = Math.max(...points);
        let i = 0;
        points.forEach((point, index) => { if (point === maxPoint) i = index })
        return i;
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote content={anecdotes[selected]} votes={points[selected]} />
            <Button handleClick={() => vote()} title="vote" />
            <Button handleClick={() => setSelected(getRandom(anecdotes.length))} title="next anecdote" />
            <h1>Anecdote with most votes</h1>
            <Anecdote content={anecdotes[getPopular()]} votes={points[getPopular()]} />
        </div>
    )
}


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
