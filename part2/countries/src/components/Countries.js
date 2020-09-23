import React from 'react';
import Country from './Country';

const Countries = ({ countries, showCountry }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    } else if (countries.length !== 1) {
        return countries.map(country => (
            <div key={country.name}>
                {country.name} <button onClick={() => showCountry(country)}>show</button>
            </div>
        ));
    } else {
        return <Country country={countries[0]} />;
    }
};

export default Countries;
