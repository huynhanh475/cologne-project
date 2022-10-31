import React, { useState } from 'react';
import './Login.css';
import login from '../images/login.jpg';
import Cologne from '../images/Cologne.png'
import { request } from '../../utils/request';
import { Button, Form, Input, Select, notification } from 'antd';
import { onLogInSuccess } from '../../utils/auth';
import Swal from 'sweetalert2';

function Login() {
    const options = [
        { value: "manufacturer", text: "Manufacturer" },
        { value: "deliverer", text: "Deliverer" },
        { value: "retailer", text: "Retailer" },
    ]

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState(options[0].value);
    const [isLoading, setIsLoading] = useState(false);

    // handleChange(e){
    //     setUserType(e.target.value);
    //     console.log("userType: " + userType);
    //     console.log("e value: " + e.target.value);
    // }

    const handleSubmit = async (e) => {
        
        try {
            e.preventDefault();
            const item = { id, password, userType };
            console.log(item)
            const params = {
                method : "POST",
                url: "/user/signin",
                body: item,
                headers: { 'Content-Type': "application/json" },
            }
            setIsLoading(true)
            const rawResponse = await request(params);
            const response = await rawResponse.json();
            console.log(response)
            setIsLoading(false)
            if (rawResponse.status === 200){
                
                onLogInSuccess(response.data)
                // console.log("Role: " + jsonData.data.role)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.message,
                })
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    const handleOnFormFinish = async (values) => {
        try {
            const params = {
                method : "POST",
                url: "/user/signin",
                body: values,
                headers: { 'Content-Type': "application/json" },
            }
            setIsLoading(true)
            const rawResponse = await request(params);
            const response = await rawResponse.json();
            console.log(response)
            setIsLoading(false)
            if (rawResponse.status === 200){
                
                onLogInSuccess(response.data)
                // console.log("Role: " + jsonData.data.role)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.message,
                })
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    const handleOnFormFailed = (errorInfo) => {
        console.log(`failed: ${errorInfo}`)
    }

    const handleChange = (value) => {
        setUserType(value);
        console.log(value)
    }

    return (
        <div className="main-login">
            <div className="login-contain">
                <div id="logo">
                    <a href="/"><img src={Cologne} style={{ width: '130px', height: '130px', objectFit: 'fill' }} alt="cologne-logo" /></a>
                </div>
                <div className="left-side">
                    <div className='title'>Welcome Back!</div>
                    <h2>Please sign in to use the system</h2>
                    <Form 
                        layout='vertical'
                        onFinish={handleOnFormFinish}
                        onFinishFailed={handleOnFormFailed}
                    >
                        <Form.Item 
                            name="userType" 
                            label="User Type" 
                            rules={[{ required: true, message: "Please select user type" }]} 
                            htmlFor="userType" 
                        >
                            <Select
                                id="uesrType"
                                placeholder="Select user type"
                            >
                                {options.map(option => (
                                    <Select.Option key={option.value} value={option.value}>
                                        {option.text}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="User ID"
                            name="id"
                            rules={[{ required: true, message: 'Please input user ID!' }]}
                            htmlFor="id"
                            style={{width:"100%"}}
                        >
                            <Input
                                id="id"
                                placeholder="Enter user ID" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input password!' }]}
                            htmlFor="password"
                            style={{width:"100%"}}>
                                <Input
                                    type='password'
                                    id="password"
                                    placeholder="Enter password"
                                    bordered={false} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                id="button_login"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Sign in
                            </Button>
                        </Form.Item>
                        
                    </Form>
                </div>

                <div className="right-side">
                    <img src={login} style={{ width: "100%", height: "100%", objectFit: 'cover' }} alt="login-background"/>
                </div>
            </div>
        </div>
    )
}


export default Login