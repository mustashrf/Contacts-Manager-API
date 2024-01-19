import { React, useState } from 'react'
import Signup from './Signup';
import Login from './Login';
import './Account.css'

function Account({ setIsAuthenticated }) {

    const [isLoginVisible, setLoginVisible] = useState(true);
    const [isSignupVisible, setSignupVisible] = useState(false);

    const displayUserForm = (showLogin, showSignup) => {
        setLoginVisible(showLogin);
        setSignupVisible(showSignup);
    };

    return (
        <div className='account-container'>

            <div className="tab-box">
                <span className="login-tab" onClick={() => displayUserForm(true, false)}>LOGIN</span>
                <span className="signup-tab" onClick={() => displayUserForm(false, true)}>SIGN UP</span>
            </div>

            <div className="content">

                <Signup
                    displayUserForm={displayUserForm}
                    isVisible={isSignupVisible}
                ></Signup>

                <Login
                    setIsAuthenticated={setIsAuthenticated}
                    isVisible={isLoginVisible}
                ></Login>

            </div>

        </div>
    )
}

export default Account