import React, {useState} from 'react';
import './CreateUserForm.css';
import Cologne from '../../images/Cologne.png';
import login from '../../images/login.jpg';
import {Button} from 'antd';

function UserForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div className="create-user-background">
            <div className="create-user-container">
                <div className="container-1">
                    <img src={Cologne} alt="logo" className="logo" />
                    <img src={login} alt="login-image" className="login-image" />
                </div>

                <div className="container-2">
                    <div className="create-user-info">
                        <div className="create-user-title">Create user</div>
                        <div className="personal-info">Personal Information</div>
                        <div className="line"></div>
                        <div className="label">Name</div>
                        <input className="label-input" onChange={(e)=>{setName(e.target.value); console.log(name)}}/>
                        <div className="label">Email</div>
                        <input className="label-input" onChange={(e)=>{setEmail(e.target.value)}} type="email"/>
                        <div className="label">Address</div>
                        <input className="label-input" onChange={(e)=>{setAddress(e.target.value)}}/>
                        <div className="label">Password</div>
                        <input className="label-input" onChange={(e)=>{setPassword(e.target.value)}} type="password"/>
                        {/* <div className="label">User Type</div>
                        <div className="dropdown">
                            <select onChange={(e)=>{setUserType(e.target.value)}} className="select-option">
                                <option value="manufacturer">Manufacturer</option>
                                <option value="deliverer">Deliverer</option>
                                <option value="retailer">Retailer</option>
                            </select>
                        </div>
                        <div className="label">Role</div>
                        <div className="dropdown">
                            <select onChange={(e)=>{setRole(e.target.value)}} className="select-option">
                                <option value="admin">Admin</option>
                                <option value="client">Client</option>
                            </select>
                        </div> */}
                        <div className="submit-button">
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm