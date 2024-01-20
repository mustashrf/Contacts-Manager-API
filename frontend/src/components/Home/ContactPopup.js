import { React, useState } from 'react'
import './style/ContactPopup.css'
import ContactForm from './ContactForm';
import CreateContact from './CreateContact';
import UpdateContact from './UpdateContact';
import DeleteContact from './DeleteContact';

function ContactPopup({ bearerToken, selectedContact, contacts, setContacts, closePopup }) {

    const [name, setName] = useState(selectedContact ? selectedContact.name : '');
    const [phone, setPhone] = useState(selectedContact ? selectedContact.phone : '');
    const [email, setEmail] = useState(selectedContact ? selectedContact.email : '');

    return (
        <div className='contact-popup'>

            <ContactForm
                name={name}
                setName={setName}
                email={email}
                setPhone={setPhone}
                phone={phone}
                setEmail={setEmail}
            ></ContactForm>

            {selectedContact ? (
                <>
                    <UpdateContact
                        bearerToken={bearerToken}
                        id={selectedContact.id}
                        name={name}
                        phone={phone}
                        email={email}
                        closePopup={closePopup}
                        contacts={contacts}
                        setContacts={setContacts}
                    ></UpdateContact>

                    <DeleteContact
                        bearerToken={bearerToken}
                        selectedContactID={selectedContact.id}
                        name={name}
                        closePopup={closePopup}
                        contacts={contacts}
                        setContacts={setContacts}
                    ></DeleteContact>
                </>
            ) : (
                <CreateContact
                    bearerToken={bearerToken}
                    name={name}
                    phone={phone}
                    email={email}
                    closePopup={closePopup}
                    contacts={contacts}
                    setContacts={setContacts}
                ></CreateContact>
            )
            }
            <div className="close-btn">
                <button className='submit-btn' onClick={closePopup}>Close</button>
            </div>

        </div>
    )
}

export default ContactPopup