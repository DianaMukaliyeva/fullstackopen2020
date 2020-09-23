import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [result, setResult] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data);
        });
    }, []);

    useEffect(() => {
        setResult(countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())));
    }, [filter, countries]);

    const showCountry = country => {
        setResult([country]);
    };

    const handleFilter = event => {
        setFilter(event.target.value);
    };

    return (
        <div className='App'>
            <Filter filter={filter} handleFilter={handleFilter} />
            {filter === '' ? '' : <Countries countries={result} showCountry={showCountry} />}
        </div>
    );
};

export default App;
