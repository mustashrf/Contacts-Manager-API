import React, { useState, useEffect } from 'react'
import './style/Home.css'
import AuthService from '../../Services/auth.service'
import ContactPopup from './ContactPopup';

function Home({ setIsAuthenticated }) {

    const [bearerToken, setBearerToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState([]);

    const [selectedContact, setSelectedContact] = useState(null);
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleRowClick = (contact) => {
        setSelectedContact(contact);
        setPopupVisible(true);
    };

    const handleCreateClick = () => {
        setSelectedContact(null);
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

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
                        {
                            contacts.length > 0 ? (
                                contacts.map((contact) => (
                                    <tr key={contact.id} onClick={() => handleRowClick(contact)}>
                                        <td>{contact.name}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.created_by}</td>
                                        <td>{contact.created_at}</td>
                                        <td>{contact.updated_by}</td>
                                        <td>{contact.updated_at}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No contacts available</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="actions-container">
                <button className='action-btn' onClick={handleCreateClick}>Create</button>
                <button
                    className="action-btn"
                    onClick={
                        () => {
                            AuthService.logout();
                            setIsAuthenticated(false);
                        }
                    }
                >
                    Logout
                </button>
            </div>

            {isPopupVisible && (
                <ContactPopup
                    bearerToken={bearerToken}
                    selectedContact={selectedContact}
                    contacts={contacts}
                    setContacts={setContacts}
                    closePopup={handlePopupClose}
                />
            )}

        </div>
    )
}

export default Home