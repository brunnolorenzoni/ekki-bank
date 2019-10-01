

import React, { useState, useEffect } from 'react';


import ContactsList from './ContactsList'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Input from '4all-ui/components/Input';
import Alert from '4all-ui/components/Alert';

import { addContact, getContacts, deleteContact } from '../../../service'
import { setContacts } from '../../../store/actions/contacts';

import { connect } from 'react-redux';

const ContactsBarContent = (props) => {

    const { user, contacts, open, setContacts  } = props;

    const [contactAdd, setContactAdd] = useState('')

    const [contactAddError, setContactAddError] = useState({
        message: '',
        error: false
    })

    const handleChange = (e) => {
        setContactAdd(e.target.value)
    }

    const submitContact = async (e) => {
        if(contactAdd && contactAdd.length){

            const contact = await addContact(user.id, {cpf: contactAdd});

            if(contact.status == 400){
                setContactAddError({
                    message: contact.data.message,
                    error: true
                })
            } else {
                const contacts = await getContacts(user.id).then(contacts => contacts);
                setContacts(contacts)
            }

        }
    }

    const deleteOneContact = async (idContact) => {
        const contact = await deleteContact(user.id, idContact);

        if(contact.status == 400){
            setContactAddError({
                message: contact.data.message,
                error: true
            })
        } else {
            const contacts = await getContacts(user.id).then(contacts => contacts);
            setContacts(contacts)
        }
    }

    useEffect(() => {

        if(contactAddError.error){
            setTimeout(function(){
                setContactAddError({error: false})
            }, 2000)
        }


    }, [contactAddError.error]);

    return (
        <div className="bar-content">

            <div className="add-container">
                <Input
                    name="add-contact"
                    onChange={handleChange}
                    placeholder="Digite o CPF para adicionar"
                    width="100%"
                    customIcon={<PersonAddIcon/>} 
                    onIconClick={submitContact}
                    value={contactAdd}
                    error={contactAddError.error}
                />

            { contactAddError.error ?

                <Alert>
                    {contactAddError.message}
                </Alert>

                : null

            }

            </div>

            {

                contacts.length ? <ContactsList deleteContact={deleteOneContact} contacts={contacts}/> : <h5 className="no-contacts">Sem contatos</h5>
            
            }
            

        </div>

    )


}

const mapStateToProps = (state) => {
    return { 
        storeContacts: state.contacts
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        setContacts: (contacts) => { dispatch(setContacts(contacts)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactsBarContent);