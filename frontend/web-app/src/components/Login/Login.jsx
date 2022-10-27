import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import login from '../../components/images/login.jpg';
import Cologne from '../../components/images/Cologne.png'

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('user-info')){
            navigate("/admin/createuser");
        }
    },[])
    async function handleSubmit(){
        let item = {id, password};
        let result = await fetch("localhost:3000/user/signin",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        navigate("/admin/createuser");
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
                        <label htmlFor="id">User ID</label>
                        <input
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter user ID" />

                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password" />

                        <button
                            type="submit"
                            id="button_login"
                            onClick={handleSubmit}
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