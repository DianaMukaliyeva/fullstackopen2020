import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Header from './components/Header';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data);
        });
    }, []);

    const personsToShow =
        filter === ''
            ? persons
            : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    const handleFilter = event => {
        setFilter(event.target.value);
    };

    const handleName = event => {
        setNewName(event.target.value);
    };

    const handleNumber = event => {
        setNewNumber(event.target.value);
    };

    const addContact = event => {
        event.preventDefault();
        const newContact = { name: newName, number: newNumber };
        if (persons.filter(person => person.name === newContact.name).length > 0) {
            alert(`${newContact.name}  is already added to phonebook`);
        } else {
            setPersons(persons.concat(newContact));
        }
        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <Header title='Phonebook' />
            <Filter filter={filter} handleFilter={handleFilter} />
            <Header title='add a new' />
            <Form
                newName={newName}
                newNumber={newNumber}
                addContact={addContact}
                handleName={handleName}
                handleNumber={handleNumber}
            />
            <Header title='Numbers' />
            <Contacts persons={personsToShow} />
        </div>
    );
};

export default App;
