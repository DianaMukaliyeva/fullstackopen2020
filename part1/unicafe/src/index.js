import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, name }) => (
    <button onClick={handleClick}>{name}</button>
)

const Header = ({ content }) => (
    <h1>{content}</h1>
)

const Result = ({ title, result }) => (
    <div>{title} {result}</div>
)

const Statistic = ({ title, good, neutral, bad }) => {
    const all = good + neutral + bad;
    const average = all !== 0 ? (good - bad) / all : 0;
    const positive = all !== 0 ? good / all * 100 + ' %' : 0 + ' %';

    return (
        <div>
            <Header content={title} />
            <Result title="good" result={good} />
            <Result title="neutral" result={neutral} />
            <Result title="bad" result={bad} />
            <Result title="all" result={all} />
            <Result title="average" result={average} />
            <Result title="positive" result={positive} />
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <Header content='give feedback' />
            <Button handleClick={() => { setGood(good + 1) }} name="good" />
            <Button handleClick={() => { setNeutral(neutral + 1) }} name="neutral" />
            <Button handleClick={() => { setBad(bad + 1) }} name="bad" />
            <Statistic title="statistics" good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
