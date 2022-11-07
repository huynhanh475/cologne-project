import React from 'react';
import {useNavigate} from 'react-router-dom'
import admin from "../../images/admin.svg";
import './HomePageAdmin.css';
import { Row, Col, Image, Typography, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { getUser } from '../../../utils/auth';

function HomePageAdmin() {
    const currentUser = JSON.parse(getUser());
    const navigate = useNavigate();
    return (
        <div>
            <Row justify='center' align='middle' style={{margin: "20vh auto"}}>
                <Col>
                    <Image
                        width="80%"
                        src={admin}
                        preview={false}
                    />
                </Col>
                <Col>
                    <Typography.Title>Welcome back,</Typography.Title>
                    <span style={{fontSize: "32px"}}>{currentUser.name}!</span>
                    <div style={{marginTop:"1rem"}}>
                        <Button 
                            icon={<ArrowRightOutlined />}
                            size="large"
                            onClick={() => navigate('/admin/userlist')}
                        >View Users</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomePageAdmin