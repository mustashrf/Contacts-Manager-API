import React, { useState } from 'react'
import './AccountForm.css'
import AuthService from '../../Services/auth.service'

export default function Login({setIsAuthenticated}) {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const displayUserForm = (login_display, signup_display) => {
        document.querySelector('.login-window').style.display = login_display;
        document.querySelector('.signup-window').style.display = signup_display;
    };

    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = await AuthService.login(email, password);
            console.log('Login successful:', response);
            setIsAuthenticated(true)
        } catch (error) {
            document.querySelectorAll('.login-window .inputs').forEach(e => e.style.backgroundColor = '#FFCDD2');
        }
    }

    async function handleSignup(e) {
        e.preventDefault();

        try {
            const response = await AuthService.register(firstName, lastName, email, password);
            console.log('signup successful:', response);
            displayUserForm('flex', 'none');
        } catch (error) {
            document.querySelectorAll('.signup-window .inputs').forEach(e => e.style.backgroundColor = '#FFCDD2');
        }
    }

    return (
        <div className="account-container">

            <div className="tab-box">
                <span className="login-tab" onClick={() => displayUserForm('flex', 'none')}>LOGIN</span>
                <span className="signup-tab" onClick={() => displayUserForm('none', 'flex')}>SIGN UP</span>
            </div>

            <div className="content">
                <div className="login-window">
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
                <div className="signup-window">
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
            </div>

        </div>
    )
}