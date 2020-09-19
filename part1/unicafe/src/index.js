import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, name }) => (
    <button onClick={handleClick}>{name}</button>
)

const Header = ({ content }) => (
    <h1>{content}</h1>
)

const Statistic = ({ text, value }) => (
    <div>{text} {value}</div>
)

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;

    if (all === 0) {
        return <div>No feedback given</div>
    }
    const average = (good - bad) / all;
    const positive = good / all * 100 + ' %';

    return (
        <div>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} />
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
            <Header content="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
