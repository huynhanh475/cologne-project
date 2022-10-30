import React, {useState} from 'react';
import './CreateUserForm.css';
import Cologne from '../../images/Cologne.png';
import login from '../../images/login.jpg';
import {Button, Modal} from 'antd';
import { request } from '../../../utils/request';

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState("false");

    const clearField= () => {
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
    }

    const handleOnClick = async(e) => {
        e.preventDefault();
        const userType = JSON.parse(localStorage.getItem("USER_DATA"))["userType"];
        const token = localStorage.getItem("AUTH_DATA");
        const item = {address, email, name, password};
        const params = {
            method : "POST",
            url: "/user/createUser",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        console.log(item);
        setIsLoading(true);
        const response = await request(params);
        if (response.ok){
            setIsLoading(false);
            console.log(response.status);
            Modal.success({
                content: "Create user successfully!",
            });
            document.getElementById("create-user").reset();
            clearField();
        }
        else{
            setIsLoading(false);
            console.log(response.status);
            Modal.error({
                title: 'Create user unsuccessfully',
                content: 'Please fill in the required information',
            });
        }
    }

    return (
        <div className="create-user-background">
            <div className="create-user-container">
                <div className="container-1">
                    <img src={Cologne} alt="logo" className="logo" />
                    <img src={login} alt="login-image" className="login-image" />
                </div>

                <div className="container-2">
                    <form className="create-user-info" id ="create-user">
                        <div className="create-user-title">Create user</div>
                        <div className="personal-info">Personal Information</div>
                        <div className="line"></div>
                        <div className="label">Name</div>
                        <input className="label-input" onChange={(e)=>{setName(e.target.value)}}/>
                        <div className="label">Email</div>
                        <input className="label-input" onChange={(e)=>{setEmail(e.target.value)}} type="email"/>
                        <div className="label">Address</div>
                        <input className="label-input" onChange={(e)=>{setAddress(e.target.value)}}/>
                        <div className="label">Password</div>
                        <input className="label-input" onChange={(e)=>{setPassword(e.target.value)}} type="password"/>
                        <div className="submit-button" onClick={handleOnClick}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserForm