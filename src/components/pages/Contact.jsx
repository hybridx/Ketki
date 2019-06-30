import React from 'react';
import { Typography, Row, Col, Switch } from 'antd';
import Header from '../Header';
import Footer from '../Footer';

const { Title } = Typography;

const Contact = () => (
    <div>
        <Header />
        <Row className="rc-container-contact">
            <Col md={12} sm={24}>
                <Title level={2} style={{ color: '#4a2c3294'}}>Clinic Address </Title>
                <Title level={4} style={{ color: '#1890ff'}}>#20, Anand Nagar</Title>
                <Title level={4} style={{ color: '#1890ff'}}>Hadapsar, Pune</Title>
                <Title level={4} style={{ color: '#1890ff'}}>411028</Title>
                <Title level={2} style={{ color: '#4a2c3294'}}>Time </Title>
                <Title level={4} style={{ color: '#1890ff'}}>10 AM - 8 PM <span><Switch checkedChildren="Open" unCheckedChildren="Closed" checked={new Date().getHours() >  10 && new Date().getHours < 20}></Switch></span></Title>
                <Title level={2} style={{ color: '#4a2c3294'}}>Call </Title>
                <Title level={4} style={{ color: '#1890ff'}}>+91 9823456890</Title>
            </Col>
                <Col md={12} sm={24} style={{ height: '100%' }}>
                    <iframe title="gmap-ketki-clinic" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.65555865655!2d73.9418979950822!3d18.49925479384525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c20456ec2805%3A0x24ecf0770eba5ed4!2sKetki+Piles+Injection+Clinic!5e0!3m2!1sen!2sin!4v1561900992959!5m2!1sen!2sin" frameborder="0" style={{ border: 0 }} className={'embed-google-map'} allowfullscreen></iframe>
                </Col>     
            </Row>
        <Footer />
    </div>
)


export default Contact;