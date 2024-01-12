import React from 'react'
import './AccountForm.css'

export default function Login() {

    return (
        <div className="container">
    
            <div className="tab-box">
                <span className="login-tab" onClick={()=>displayUserForm('flex', 'none')}>LOGIN</span>
                <span className="signup-tab" onClick={()=>displayUserForm('none', 'flex')}>SIGN UP</span>
            </div>
    
            <div className="content">
                <div className="login-window">
                    <h1>Login to your account</h1>
                    <form action="" className="user-form">
                        <input className="inputs" type="email" placeholder='Email'/><br></br>
                        <input className="inputs" type="password" placeholder='Password'/><br></br>
                        <input className="inputs submit-btn" type="submit" value='Login'/><br></br>
                    </form>
                </div>
                <div className="signup-window">
                    <h1>Create a new account</h1>
                    <form action="" className="user-form">
                        <input className="inputs" type="text" placeholder='First name'/><br></br>
                        <input className="inputs" type="text" placeholder='Last name'/><br></br>
                        <input className="inputs" type="email" placeholder='Email'/><br></br>
                        <input className="inputs" type="password" placeholder='Password'/><br></br>
                        <input className="inputs submit-btn" type="submit" value='Sign Up'/><br></br>
                    </form>
                </div>
            </div>

        </div>
    )
}

function displayUserForm(login_display, signup_display) {
    document.querySelector('.login-window').style.display = login_display
    document.querySelector('.signup-window').style.display = signup_display
}