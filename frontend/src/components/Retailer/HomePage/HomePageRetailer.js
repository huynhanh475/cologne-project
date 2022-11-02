import React from 'react';
import retailer from "../../images/retailer.svg";
import './HomePageRetailer.css';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Image, Typography, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { getUser } from '../../../utils/auth';

function HomePageRetailer() {
    const currentUser = JSON.parse(getUser());
    const navigate = useNavigate();
    console.log(currentUser)
    return (
        <div>
            <Row justify='center' align='middle' style={{ margin: "20vh auto" }}>
                <Col>
                    <Image
                        width="80%"
                        src={retailer}
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
                            onClick={() => navigate('/retailer/productlist')}
                        >View Product</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomePageRetailer