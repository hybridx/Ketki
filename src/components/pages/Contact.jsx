import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Header from '../Header';
import Footer from '../Footer';
import { mapConfig } from '../../constants'

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
                <h1>Clinic Address </h1>
                <h3>#20, Anand Nagar</h3>
                <h3>Hadapsar, Pune</h3>
                <h3>411028</h3>
                <h1>Time </h1>
                <h3>10 AM - 8 PM</h3>
                <h1>Call </h1>
                <h3>+91 9823456890</h3>
            </div>
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
        <Footer />
    </div>
)


export default Contact;