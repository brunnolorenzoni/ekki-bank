import React, { useState } from 'react';


import ContactBarHeader from './ContactBarHeader'
import ContactsBarContent from './ContactsBarContent'

import './index.scss'

const ContactsBar = (props) => {

    const { contacts, user } = props;

    const [showContacts, setShowContacts] = useState(false);

    const toogleShowContacts = () => {
        setShowContacts(!showContacts);
    }

    return (
        <div className="contacts-bar">

            <ContactBarHeader openContacts={toogleShowContacts}/>

            { showContacts ? < ContactsBarContent contacts={contacts} user={user} /> : null}
            
        </div>
    )


}

export default ContactsBar;