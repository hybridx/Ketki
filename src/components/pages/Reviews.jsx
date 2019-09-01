import React from "react";
import { Row, Col } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import { reviews } from "../../assets/data";
import ReusableForm from "../ReusableForm";

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
        <Row md={12} xs={12}>
          <Col md={14} xs={24}>
            <ReusableForm />
          </Col>
          {/* <h1 class="primary-text"> इंजेकशन (Applicator) ची ठळक वैशिष्ट्ये </h1> */}
        </Row>
        {/* <div id="google-reviews"></div> */}
        <hr style={{ margin: "50px 0" }} />
        <h1 class="primary-text">
          Reviews
          &nbsp;
          <small>
          (Total Count) 95% reviews are Rated 5.0 of 5
          </small> 
        </h1>
        <div className="reviews-parent" id="review-parent">
          {showReviews}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
