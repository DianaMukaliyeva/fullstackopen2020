import React from 'react';

const Contacts = ({ persons }) =>
    persons.map(person => (
        <div key={person.name}>
            {person.name} {person.number}
        </div>
    ));

export default Contacts;
