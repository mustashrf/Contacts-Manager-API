import React from 'react'
import axios from "axios";
import { API_URL } from '../../utils/constants';

function UpdateContact({bearerToken, id, name, phone, email, closePopup, contacts, setContacts}) {

    const updateContact = async () => {
        try {
            const response = await axios.put(
                API_URL + "contact/update/",
                {
                    id,
                    name,
                    phone,
                    email,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`
                    },
                }
            );
            closePopup();

            const updatedInstance = response.data

            const updatedContacts = contacts.map(contact => contact.id === updatedInstance.id ? {
                ...contact,
                name: updatedInstance.name,
                phone: updatedInstance.phone,
                email: updatedInstance.email,
                updated_by: updatedInstance.updated_by,
                updated_at: updatedInstance.updated_at,
            } : contact
            );

            setContacts(updatedContacts);
            return response.data;
        } catch (error) {
            console.error('Update failed:', error);
        }
    }

    return (
        <div><button className='submit-btn' onClick={updateContact}>Update</button></div>
    )
}

export default UpdateContact