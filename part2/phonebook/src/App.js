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
        const sameNameContact = persons.filter(person => person.name === newName)[0];

        if (newName === '' || newNumber === '') {
            alert('fields should not be empty');
        } else if (sameNameContact) {
            const confirm = window.confirm(`${sameNameContact.name} is already added to phonebook,
                replace the old number with a  new one?`);
            if (confirm) {
                personService
                    .update({ ...sameNameContact, number: newNumber })
                    .then(updatedContact => {
                        setPersons(
                            persons.map(person => (person.id === sameNameContact.id ? updatedContact : person))
                        );
                        setNewName('');
                        setNewNumber('');
                    })
                    .catch(() => {
                        alert('does not exists!');
                    });
            }
        } else {
            const newContact = { name: newName, number: newNumber };
            personService.create(newContact).then(returnedContact => {
                setPersons(persons.concat(returnedContact));
                setNewName('');
                setNewNumber('');
            });
        }
    };

    const deleteContact = id => {
        if (window.confirm(`Delete ${id}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                })
                .catch(() => {
                    alert('does not exists!');
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
            <Contacts persons={personsToShow} deleteContactAction={deleteContact} />
        </div>
    );
};

export default App;
