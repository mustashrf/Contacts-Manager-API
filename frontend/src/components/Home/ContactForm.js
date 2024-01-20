import React from 'react'
import './style/ContactPopup.css'

function ContactForm({name, setName, email, setEmail, phone, setPhone}) {

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className='form-container'>
            <form className="contact-form">

                <input
                    className="inputs"
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={handleNameChange}
                />

                <input
                    className="inputs"
                    type="text"
                    placeholder='Phone'
                    value={phone}
                    onChange={handlePhoneChange}
                />

                <input
                    className="inputs"
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                />

            </form>
        </div>
    )
}

export default ContactForm