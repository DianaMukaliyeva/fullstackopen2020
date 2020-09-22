import React, { useState } from 'react';
import Contact from './components/Contact';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' }]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

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
            {persons.map(person => (
                <Contact key={person.name} person={person} />
            ))}
        </div>
    );
};

export default App;
