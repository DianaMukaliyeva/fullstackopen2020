import React, { useState } from 'react';
import Contact from './components/Contact';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

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
            <h2>Phonebook</h2>
            <div>
                name: <input value={filter} onChange={handleFilter} />
            </div>
            <h2>add a new</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumber} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personsToShow.map(person => (
                <Contact key={person.name} person={person} />
            ))}
        </div>
    );
};

export default App;
