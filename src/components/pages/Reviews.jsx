import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import jQuery from 'jquery';
import { GOOGLE_PLACES_API_URL } from '../../constants';

const Reviews = () => {
    const [ placesData, setPlacesData ] = useState([]);

    useEffect(() => {
    (()=> {
        fetch(GOOGLE_PLACES_API_URL)
            .then(data => data.json())
            .then(data => setPlacesData(data));
    })();
    }, []);

    return (
    <div>
        <Header />
    <div class="reviews">
        <div >
        <h2 class="primary-text"> Features </h2>
            <p>इंजेकशन ची ठळक वैशिष्ट्ये</p>
            <p> १. भारत सरकार द्वारा मान्यता प्राप्त ( पेटंट प्राप्त ) देशातील एकमेव इंजेकशन </p>
            <p> २. महाराष्ट्र शासनाचा ड्रग टेस्टिंग लॅबद्वारा परीक्षण करून मान्यता प्राप्त एकमेव इंजेकशन</p> <p> ३. १०० टक्के आयुर्वेदिक इंजेकशन</p>
            <div id="google-reviews"></div>
    </div>
        </div>
        <Footer />
    </div>)
}

export default Reviews;