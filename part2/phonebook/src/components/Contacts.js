import React from 'react';

const Contacts = ({ persons, deleteContactAction }) =>
    persons.map(person => (
        <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deleteContactAction(person.id)}>delete</button>
        </div>
    ));

export default Contacts;
