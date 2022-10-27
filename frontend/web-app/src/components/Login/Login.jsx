import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import login from '../../components/images/login.jpg';
import Cologne from '../../components/images/Cologne.png'

function Login() {
    const options = [
        { value: "", text: "Select user type" },
        { value: "manufacturer", text: "Manufacturer" },
        { value: "deliverer", text: "Deliverer" },
        { value: "retailer", text: "Retailer" },
    ]

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState(options[0].value);

    const navigate = useNavigate();

    // handleChange(e){
    //     setUserType(e.target.value);
    //     console.log("userType: " + userType);
    //     console.log("e value: " + e.target.value);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { id, password, userType };
        console.log(item);
        fetch("http://localhost:8090/user/signin", {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(item)
        }).then(response => {
            if (response.ok) {
                console.log("ok");
                navigate("/admin/createuser");
            }

        })
    }

    const handleChange = (e) => {
        setUserType(e.target.value);
    }


    // result = await result.json();
    // console.log(item);
    // localStorage.setItem("user-info",JSON.stringify(result));
    // navigate('/admin/createuser');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let item = {id, password, userType};
    //     let result = await fetch("http://localhost:8090/user/signin",{
    //         method: 'POST',
    //         headers:{"Content-Type":"application/json", "Accept": 'application/json'
    //     },
    //         body: JSON.stringify(item)
    //     });
    //     console.log(result.json());
    // }

    return (
        <div className="main-login">
            <div className="login-contain">
                <div id="logo">
                    <a href="/"><img src={Cologne} style={{ width: '130px', height: '130px', objectFit: 'fill' }} /></a>
                </div>
                <div className="left-side">
                    <div className='title'>Welcome Back!</div>
                    <h2>Please sign in to use the system</h2>
                    <form>
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

                        <label htmlFor="userType">User Type</label>
                        {/* <select onChange={handleChange} className="select-user-type" id="usertype">
                            <option value="">Select User Type</option>
                            <option value="manufacturer">Manufacturer</option>
                            <option value="deliverer">Deliverer</option>
                            <option value="retailer">Retailer</option>
                        </select> */}
                        <select className="select-user-type" id="usertype" value={userType} onChange={handleChange}>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>

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