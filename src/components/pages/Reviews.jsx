import React from "react";
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
          <h1 class="primary-text"> Features </h1>

          {/* <h1 class="primary-text"> इंजेकशन (Applicator) ची ठळक वैशिष्ट्ये </h1> */}
          <div>
            {/* <p>
              १. भारत सरकार द्वारा मान्यता प्राप्त ( पेटंट प्राप्त ) देशातील
              एकमेव इंजेकशन (Applicator){" "}
            </p>
            <p>
              २. महाराष्ट्र शासनाचा ड्रग टेस्टिंग लॅबद्वारा परीक्षण करून मान्यता
              प्राप्त एकमेव इंजेकशन (Applicator){" "}
            </p>
            <p>३. १०० टक्के आयुर्वेदिक इंजेकशन (Applicator) </p>
            <p>
              ४. इंजेकशनमुळे (Applicator) ग ुदभागातील रक्तस्त्राव व वेदना
              तात्काळ थांबतात
            </p>
            <p>
              ५. ऑपरेशन / क्षारसूत्रावेळी गुदभागाचे कृत्रिम डायलाश करावे लागू
              शकते{" "}
            </p>
            <p>
              पण ह्या इंजेकशनासाही (Applicator) ही आवश्यकता नाही. म्हणून
              भविष्यात गुदव्दाराचा आकार व लवचिकता नैसर्गिक राहते.{" "}
            </p>
            <p>
              ६. रक्तस्त्राव व अत्याधिक प्रमाणात वेदना देणाऱ्या ऑपरेशन /
              क्षारसूत्राच्या त्रासातून रुग्णाची कायम सुटका .
            </p>
            <p>
              ७. सुटसुटीत उपचार , उपचारासाठी ऍडमिट होण्याची आवश्यकता नाही .{" "}
            </p>
            <p>
              ८. उपचार दरम्यान आंबट पदार्थ व मद्यसेवन बंद याशिवाय इतर कुठलेही
              पथ्य नाही .{" "}
            </p>
            <p>
              ९. इतर उपचाराचे पुन्हा पुन्हा होणारे मूळव्याध व गुदभागाचे आजार या
              इंजेकशनमुळे (Applicator) शक्यतो परत होत नाहीत.
            </p> */}
            <p>1) 100 percent Ayurvedic Injection (Applicator) </p>
            <p>2) Instantly Stops Bleeding PerRectal </p>
            <p>3) Instantly Minimises Paining </p>
            <p>4) Easy going treatment </p>
            <p>5) No need of admition for treatment </p>
            <p>
              6) During Treatment No Burden or Restrictions on diet except Sour
              eatables{" "}
            </p>
            <p>7) Probably Non-recurring treatment for Piles </p>
          </div>
          {/* <div id="google-reviews"></div> */}
          <hr style={{ margin: "50px 0" }} />
          <h1 class="primary-text"> Reviews </h1>
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
