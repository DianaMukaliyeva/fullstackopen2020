import React from 'react';

const Country = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
            {country.languages.map(l => (
                <li key={l.name}>{l.name}</li>
            ))}
        </ul>
        <img style={{ widht: '100px', height: '100px' }} alt={`flag ${country.name}`} src={country.flag} />
    </div>
);

export default Country;
