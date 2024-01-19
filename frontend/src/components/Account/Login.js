import React, { useState } from 'react'
import './Account.css'
import authService from '../../Services/auth.service';

export default function Login({ setIsAuthenticated, isVisible }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = await authService.login(email, password);
            console.log('Login successful:', response);
            setIsAuthenticated(true)
        } catch (error) {
            document.querySelectorAll('.login-window .inputs').forEach(e => e.style.backgroundColor = '#FFCDD2');
        }
    }

    return (
        <div className="login-window" style={{ display: isVisible ? 'flex' : 'none' }}>
            <h1>Login to your account</h1>
            <form onSubmit={handleLogin} className="user-form">
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
                <input className="submit-btn" type="submit" value='Login' /><br></br>
            </form>
        </div>
    )
}