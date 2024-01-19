import React, { useState } from 'react'
import './Account.css'
import authService from '../../Services/auth.service';

export default function Signup({ displayUserForm, isVisible }) {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignup(e) {
        e.preventDefault();

        try {
            const response = await authService.register(firstName, lastName, email, password);
            console.log('signup successful:', response);
            displayUserForm(true, false);
        } catch (error) {
            document.querySelectorAll('.signup-window .inputs').forEach(e => e.style.backgroundColor = '#FFCDD2');
        }
    }

    return (
        <div className="signup-window" style={{ display: isVisible ? 'flex' : 'none' }}>
            <h1>Create a new account</h1>
            <form onSubmit={handleSignup} className="user-form">
                <input
                    className="inputs"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                />
                <br />
                <input
                    className="inputs"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                />
                <br />
                <input
                    className="inputs"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    className="inputs"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input className="submit-btn" type="submit" value='Signup' /><br></br>
            </form>
        </div>
    )
}