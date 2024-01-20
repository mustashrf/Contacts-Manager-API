import React from 'react'
import axios from "axios";
import { API_URL } from '../../utils/constants';

function DeleteContact({bearerToken, selectedContactID, name, closePopup, contacts, setContacts}) {

    const deleteContact = async () => {
        try {
            const response = await axios.delete(
                API_URL + "contact/delete/",
                {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`
                    },
                    data: {
                        name
                    }
                }
            );
            closePopup();
            setContacts(contacts.filter(contact => contact.id !== selectedContactID));
            return response.data;
        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    return (
        <div><button className='submit-btn' onClick={deleteContact}>Delete</button></div>
    )
}

export default DeleteContact