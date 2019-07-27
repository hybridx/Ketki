import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { reviews } from "../../assets/data";
// import jQuery from 'jquery';
// import { GOOGLE_PLACES_API_URL } from '../../constants';

const Reviews = () => {
  // const [ placesData, setPlacesData ] = useState([]);
  const showReviews = reviews.map(review => (
    <div className="reviews-child">
      <p className="reviewer-name">{review.author_name}</p>
      <p>
        <img src={review.profile_photo_url} alt={review.profile_photo_url} />
      </p>
      <p>{review.relative_time_description}</p>
      <p className="reviewer-stars">{review.rating}</p>
      <p>{review.text}</p>
    </div>
  ));

  return (
    <div>
      <Header />
      <div class="reviews">
        <div>
          <h2 class="primary-text"> Features </h2>
          <p>इंजेकशन ची ठळक वैशिष्ट्ये</p>
          <p>
            {" "}
            १. भारत सरकार द्वारा मान्यता प्राप्त ( पेटंट प्राप्त ) देशातील एकमेव
            इंजेकशन{" "}
          </p>
          <p>
            {" "}
            २. महाराष्ट्र शासनाचा ड्रग टेस्टिंग लॅबद्वारा परीक्षण करून मान्यता
            प्राप्त एकमेव इंजेकशन
          </p>{" "}
          <p> ३. १०० टक्के आयुर्वेदिक इंजेकशन</p>
          {/* <div id="google-reviews"></div> */}
          <div className="reviews-parent" id="review-parent">
            {showReviews}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
