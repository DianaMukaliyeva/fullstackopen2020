import React, { useState } from 'react';
import Contact from './components/Contact';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    const handleChange = event => {
        setNewName(event.target.value);
    };

    const addContact = event => {
        event.preventDefault();
        const newContact = { name: newName };
        setPersons(persons.concat(newContact));
        setNewName('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
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
