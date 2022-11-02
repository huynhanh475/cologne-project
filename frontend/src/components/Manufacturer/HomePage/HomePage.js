import React from 'react';
import manufacturer from "../../images/manufacturer.svg";
import './HomePage.css';
import { Row, Col, Image, Typography, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { getUser } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const currentUser = JSON.parse(getUser());
    const navigate = useNavigate();
    console.log(currentUser)
    return (
        <div>
            <Row justify='center' align='middle' style={{ margin: "20vh auto" }}>
                <Col>
                    <Image
                        width="80%"
                        src={manufacturer}
                        preview={false}
                    />
                </Col>
                <Col>
                    <Typography.Title>Welcome back,</Typography.Title>
                    <span style={{ fontSize: "32px" }}>{currentUser.name}!</span>
                    <div style={{ marginTop: "1rem" }}>
                        <Button
                            icon={<ArrowRightOutlined />}
                            size="large"
                            onClick={() => navigate('/manufacturer/productform')}
                        >Create Product</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomePage