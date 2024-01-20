import React from 'react'
import axios from "axios";
import { API_URL } from '../../utils/constants';

function CreateContact({bearerToken, name, phone, email, closePopup, contacts, setContacts}) {

    const createContact = async () => {
        try {
            const response = await axios.post(
                API_URL + "contact/create/",
                {
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

            setContacts([...contacts, response.data]);

            return response.data;
        } catch (error) {
            console.error('Creation failed:', error);
        }
    }

    return (
        <div><button className='submit-btn' onClick={createContact}>Create</button></div>
    )
}

export default CreateContact