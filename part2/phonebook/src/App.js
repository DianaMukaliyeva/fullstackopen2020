import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Header from './components/Header';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        personService.getAll().then(initialPersons => setPersons(initialPersons));
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
            personService.create(newContact).then(returnedContact => {
                setPersons(persons.concat(returnedContact));
                setNewName('');
                setNewNumber('');
            });
        }
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
