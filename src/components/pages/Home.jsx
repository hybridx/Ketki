import React from "react";
import { Row, Col, Carousel, Button } from "antd";
import Features from "../Features";
import { ClinicAddress, Doctor, Timing, Branches } from "../ContactSubcomponents";
import { withRouter } from "react-router-dom";
import { scrollToBottom, userIsOnMobile, scrollToTop } from "../../utils";
import syringe from "../../assets/syringe-solid.svg";
import Footer from "../Footer";
import doctor from "../../assets/doctor.png";
import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";

const Home = ({ history }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={{ span: 24 }} xs={24}>
          <Carousel autoplay autoplaySpeed={3000}>
            {/* <div className="corousal-div">
              <img src={doctor} height="100%" width="100%" alt={doctor} />
            </div> */}
            <div className="corousal-div">
              <img src={one} height="100%" width="100%" alt={one} />
            </div>
            <div className="corousal-div">
              <img src={two} height="100%" width="100%" alt={two} />
            </div>
            <div className="corousal-div">
              <img src={three} height="100%" width="100%" alt={three} />
            </div>
            <div className="corousal-div">
              <img src={four} height="100%" width="100%" alt={four} />
            </div>
          </Carousel>
          <div className="pop-over">
            <div>
              <h1 class="primary-text"> Our Speciality </h1>
              <ul class="speciality-items">
                <li>
                  Piles
                </li>
                <li>
                  Fissure
                </li>
                <li>
                  Fistula
                </li>
                <li>
                  Pilonidal Sinus
                </li>
              </ul>
              <p>
                100 percent Ayurvedic Injection (Applicator){" "}
                {/* <img src={syringe} height="20px" width="20px" alt="syringe" /> */}
              </p>
              <p>
                Instantly stops perectal bleeding {" "}
                {/* <img src={syringe} height="20px" width="20px" alt="syringe" /> */}
              </p>
              <p>
                No admission & No surgery
                {/* <img src={syringe} height="20px" width="20px" alt="syringe" /> */}
              </p>
              <p>
                Instantly Minimises Pain{" "}
                {/* <img src={syringe} height="20px" width="20px" alt="syringe" /> */}
              </p>
              <Button
                onClick={() => history.push("/reviews")}
                type="primary"
                size="large"
                htmlType="submit"
                style={{
                  width: "200px",
                  border: 0,
                  backgroundColor: "#60b718"
                }}
              >
                Book Appointment &rarr;
              </Button>
            </div>
          </div>
          <div onClick={scrollToBottom}>
            <a href="#features" class="scroll-down" address="true" />
          </div>
        </Col>
      </Row>
      <Row className="reviews">
        <Col sm={24} md={12}>
          <Features id={"features"} />
        </Col>
        <Col sm={24} md={12}>
          {/* <ReusableForm /> */}
        </Col>
      </Row>
      <Row className="reviews">
        <Col xs={24} md={6}>
          <Doctor />
        </Col>
        <Col xs={24} md={6}>
          <ClinicAddress />
        </Col>
        <Col xs={24} md={6}>
          <Branches />
        </Col>
        <Col xs={24} md={6}>
          <Timing />
        </Col>
      </Row>
      <Row>
        {userIsOnMobile() && (
          <Button
            onClick={() => {
              history.push("/reviews");
              scrollToTop();
            }}
            type="primary"
            size="large"
            htmlType="submit"
            style={{
              width: "200px",
              display: "flex",
              margin: "auto",
              border: 0,
              backgroundColor: "#60b718"
            }}
          >
            Book Appointment &rarr;
          </Button>
        )}
      </Row>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(Home);
