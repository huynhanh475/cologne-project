import React from 'react';
import {useNavigate} from 'react-router-dom';
import manufacturer from "../../images/manufacturer.svg";
import { Row, Col, Image, Typography, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { getUser } from '../../../utils/auth';

function HomePage() {
    const currentUser = JSON.parse(getUser());
    const navigate = useNavigate();
    console.log(currentUser)

  return (
    <div>
        <Row justify='center' align='middle' style={{margin: "20vh auto"}}>
            <Col span={12}>
                <Image
                    src={manufacturer}
                    preview={false}
                />
            </Col>
            <Col span={2}/>
            <Col span={8}>
                <Typography.Title>Welcome back,</Typography.Title>
                <span style={{fontSize: "32px"}}>{currentUser.name}!</span>
                <div style={{marginTop:"1rem"}}>
                    <Button 
                        icon={<ArrowRightOutlined />}
                        size="large"
                        type="primary"
                        onClick={() => navigate('/manufacturer/batchorderlist')}
                    >View Batch Orders</Button>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default HomePage