import React, { useState, useEffect } from 'react';
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { UserListColumn } from "./UserListColumn";
import { request } from '../../../utils/request';
import {Button, Col, Form, Input, Typography} from "antd"
import { UserAddOutlined } from '@ant-design/icons';
import { Modal, Row } from "antd"
import { getUser } from '../../../utils/auth';
import { capitalizeFirstLetter } from '../../../utils/functions';
import Swal from 'sweetalert2';

function UserList() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toggleFetch, setToggleFetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [userForm] = Form.useForm();

    const token = localStorage.getItem("AUTH_DATA");
    const currentUserType = capitalizeFirstLetter(JSON.parse(getUser()).userType);
    const params = {
        method: "GET",
        url: "/user",
        headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            const token = localStorage.getItem("AUTH_DATA");
            const params = {
                method : "POST",
                url: "/user/createUser",
                body: values,
                headers: { 'Content-Type': "application/json", 'x-access-token': token },
            }
            setIsLoading(true);
            const rawResponse = await request(params);
            const response = await rawResponse.json();
            setIsLoading(false);
            if (rawResponse.status === 200){
                setIsModalOpen(false);
                Swal.fire(
                    "Create user successfully",
                    `A new ${currentUserType} is created with ID: <b>${response.data.userId}</b>`,
                    'success'
                )
                reFetch();
                userForm.resetFields();
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Create user failed',
                    text: response.message,
                  })
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        userForm.resetFields();
    };

    const reFetch = () => {
        setToggleFetch(!toggleFetch);
    }

    useEffect(() => {
        const getUsers = async () => {
            const response = await request(params);
            var rawData = await response.text();
            var jsonData = JSON.parse(rawData);
            setData(jsonData["data"])
        };
        getUsers(); 
        return () => {
            // this now gets called when the component unmounts
        };
        // eslint-disable-next-line
    }, [toggleFetch]);

    return (
        <div className="page-container">
            <Modal 
                title={`Add New ${currentUserType}`} 
                open={isModalOpen} 
                onCancel={handleCancel}
                
                footer={[
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button 
                        type='primary' 
                        form="creatUserForm" 
                        key="submit" 
                        htmlType="submit"
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                ]}
            >
                <Form
                    id="creatUserForm"
                    form={userForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                    label="User Type"
                >
                    <b>{currentUserType}</b>
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input name.' }]}
                >
                    <Input placeholder={`${currentUserType} John Doe`} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Invalid email.', type:"email"}]}
                >
                    <Input placeholder="john.doe@example.com" />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input address.' }]}
                >
                    <Input placeholder="123, ABC Str." />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input password.' }]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>
                </Form>
            </Modal>
            <Row justify="end" align='middle'>
                <Col flex="auto">
                    <Typography.Title level={3}>List {currentUserType}s</Typography.Title>
                </Col>
                
                <Button type="primary" icon={<UserAddOutlined />} size='large' onClick={showModal}>
                    Add {currentUserType}
                </Button>
            </Row>

            <div className="user-list-container">
                <DataGrid
                    rows={data}
                    getRowId={(row) => row.userId}
                    columns={UserListColumn}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>

        </div>
    );
}

export default UserList