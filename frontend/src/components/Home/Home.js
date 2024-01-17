import React, { useState, useEffect } from 'react'
import './Home.css'
import AuthService from '../../Services/auth.service'

function Home() {

    const [bearerToken, setBearerToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async (query) => {
        try {
            const response = await fetch(`http://localhost:8000/contact/search?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user && user.access_token) {
            setBearerToken(user.access_token);
        }
    }, []);

    useEffect(() => {
        if (bearerToken !== '') {
            fetchContacts(searchQuery);
        }
    }, [searchQuery, bearerToken]);

    return (
        <div className="home-container">
            <input
                className="search-box"
                type="text"
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />
            <div className="contacts-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Created by</th>
                            <th>Created at</th>
                            <th>Updated by</th>
                            <th>Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>{contact.created_by}</td>
                                <td>{contact.created_at}</td>
                                <td>{contact.updated_by}</td>
                                <td>{contact.updated_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="actions-container">
                <button className='action-btn'>Create</button>
                <button className='action-btn'>Update</button>
                <button className='action-btn'>Delete</button>
            </div>
        </div>
    )
}

export default Home