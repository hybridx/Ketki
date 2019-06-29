import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Typography } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import { mapConfig } from '../../constants'

const { Title } = Typography;
const AnyReactComponent = ({ text }) => (
    <div>
      {text}
    </div>
  );

const Contact = ({}) => (
    <div>
        <Header />
        <div class="rc-container contact-container">
            <div>
                <Title style={{ color: '#825656'}}>Clinic Address </Title>
                <Title level={3} style={{ color: '#2546ff'}}>#20, Anand Nagar</Title>
                <Title level={3} style={{ color: '#2546ff'}}>Hadapsar, Pune</Title>
                <Title level={3} style={{ color: '#2546ff'}}>411028</Title>
                <Title style={{ color: '#825656'}}>Time </Title>
                <Title level={3} style={{ color: '#2546ff'}}>10 AM - 8 PM</Title>
                <Title style={{ color: '#825656'}}>Call </Title>
                <Title level={3} style={{ color: '#2546ff'}}>+91 9823456890</Title>
            </div>
                <div>
                    <GoogleMapReact
                        defaultCenter={mapConfig.center}
                        defaultZoom={mapConfig.zoom}
                    >
                    <AnyReactComponent 
                        lat={18.4997677} 
                        lng={73.9443173} 
                        text={'Ketki clinic'} 
                    />
                    </GoogleMapReact>    
                </div>     
            </div>
        <Footer />
    </div>
)


export default Contact;