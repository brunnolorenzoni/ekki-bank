import React from 'react';

import ContactsIcon from '@material-ui/icons/Contacts';

const ContactBarHeader = (props) => {

    const { openContacts } = props;

    const handleClick = () => {
        openContacts();
    } 

    return (
        
        <div className="header-warapper">

            <button onClick={handleClick} type="button" className="button-open-contacts">
                <h3 className="text">Contatos <ContactsIcon className="icon-contacts" /> </h3>
            </button>

        </div>
        

    )


}

export default ContactBarHeader;