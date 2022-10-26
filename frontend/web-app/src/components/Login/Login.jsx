import React, { useEffect, useState } from 'react';
import './Login.css';
import login from '../../components/images/login.jpg';
import Cologne from '../../components/images/Cologne.png'

function Login() {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="main-login">
            <div className="login-contain">
                <div id="logo">
                    <a href="/"><img src={Cologne} style={{ width: '130px', height: '130px', objectFit: 'fill' }} /></a>
                </div>
                <div className="left-side">
                    <div className='title'>Welcome Back!</div>
                    <h2>Please sign in to use the system</h2>
                    <form onSubmit={handleSubmit}>
                        <label for="userID">User ID</label>
                        <input
                            id="userID"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                            placeholder="Enter user ID" />

                        <label for="password">Password</label>
                        <input type="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password" />

                        <button
                            type="submit"
                            id="button_login"
                        >
                            Sign in
                        </button>
                    </form>
                </div>

                <div className="right-side">
                    <img src={login} style={{ width: "95%", height: "100%", objectFit: 'fill' }} />
                </div>
            </div>
        </div>
    )
}

export default Login