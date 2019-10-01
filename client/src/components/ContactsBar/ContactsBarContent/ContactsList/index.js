import React from 'react';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ContactsList = (props) => {

    const { contacts, deleteContact } = props;

    const handleClick = (id) => 
    {

        deleteContact(id);
    }

    return (
        
        <ul className="contacts-list">
            <h4 className="list-title">Seus contatos</h4>
            {contacts.map(contact => (
                <li key={contact.id}>
                    {contact.user_contact.name}
                    <button className="button-delete" type="button" id={contact.id} onClick={(e) => handleClick(contact.id)}>
                        <DeleteForeverIcon className="icon" />
                    </button>
                </li>
            ))}
        </ul>

    )


}

export default ContactsList;