import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Parallax from "react-rellax";
import Assistant from "./components/Assistant";
import TheLandingPageHeader from "src/containers/TheLandingPageHeader";
import Auth from "../../../Authenticate";
import { Zoom, Slide, Fade } from "react-reveal";
import { Button, IconButton, Paper } from "@material-ui/core";
import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import bg from "../../../assets/pictures/donate.png";
import hand from "../../../assets/pictures/hand.jpg";
import logo from "../../../assets/pictures/logo-color-lg.png";
import ParticlesBg from "particles-bg";
import "./landing.css";
import LandingNav from "src/containers/LandingNav";
import CheckoutForm from "../stripePayments/components/CheckoutForm";
import StripeCheckout from "../stripePayments/StripeCheckout";
import { Rating } from "@material-ui/lab";
import UrgentInfo from "../posts/components/UrgentInfo";
import Footer from "./components/Footer";
import Image1 from "./components/Image1";
import Image2 from "./components/Image2";
import Image3 from "./components/Image3";
import OurServices from "../ourservices/OurServices";
import OurServicesContent from "../ourservices/OurServicesContent";
import axios from "axios";

const Landing = (props) => {
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    if (Auth.isAuthenticated()) {
      props.history.push("/services");
    }
    loadQuote();
  }, []);

  const loadQuote = () => {
    axios
      .get("https://api.quotable.io/random")
      .then((response) => setQuote(response.data))
      .catch((error) => console.log(error.response));
  };
  return (
    <div className="main-background">
      <TheLandingPageHeader />
      <StripeCheckout
        open={checkoutModal}
        close={setCheckoutModal}
        name=""
        address=""
        mobile=""
        amount="0"
        description=""
        category="care-x"
        user_id={null}
        post_id={null}
      />
      <ParticlesBg
        type="ball"
        bg={{ ...true, position: "absolute", opacity: 0.4 }}
        // num={100}
      />
      <div className="main-content">
        <div
          className="d-md-down-none mr-auto text-center"
          style={{ paddingTop: 90 }}
        >
          <Slide down>
            <CRow>
              <CCol>
                <CButton
                  variant="outline"
                  color="dark"
                  className="mx-2"
                  onClick={() => props.history.push("/care-x/services")}
                >
                  Servics By Care-X
                </CButton>
                <CButton
                  variant="outline"
                  color="dark"
                  className="mx-2"
                  onClick={() => props.history.push("/community/services")}
                >
                  Services By Community
                </CButton>
                <CButton
                  variant="outline"
                  color="dark"
                  className="mx-2"
                  onClick={() => setCheckoutModal(true)}
                >
                  Donate your funds
                </CButton>
                <CButton
                  variant="outline"
                  color="dark"
                  className="mx-2"
                  onClick={() => props.history.push("/feedback")}
                >
                  Add Feedback
                </CButton>
                <br />
                <br />
                <hr />
              </CCol>
            </CRow>
          </Slide>
        </div>
        <CRow className="justify-content-center align-items-center">
          <CCol sm="6">
            <Zoom>
              <CContainer>
                <div className="left-side ">
                  {/* <img src={banner} width="100%" /> */}
                  <img src={logo} width="100%" />
                </div>
              </CContainer>
            </Zoom>
          </CCol>
          <CCol sm="6">
            <Fade delay={1000}>
              <div className="right-side">
                <CContainer>
                  <div>
                    {/* <div className = "display-3 "> SAVE A LIFE! </div> */}
                    <div>
                      <FavoriteBorderIcon
                        style={{ fontSize: 150, color: "#2874A6" }}
                        color="error"
                      />
                      <InsertEmoticonIcon
                        style={{ fontSize: 150 }}
                        color="error"
                      />
                    </div>
                  </div>
                </CContainer>
              </div>
            </Fade>
          </CCol>
        </CRow>

        <Parallax speed={10}>
          <div className="block-2">
            <Fade>
              <CContainer>
                <p style={{ fontSize: 20 }}>
                  This is a centralized community to securely provide and
                  receive social services such as charity works, blood
                  donations, organ donations, student scholarships and volunteer
                  works in several areas from one place.
                </p>
                <p>Join with the community to support in saving lives</p>
                <br />
                <h4 style={{ fontFamily: "cursive" }}>
                  {" "}
                  {quote.content}{" "}
                </h4>- {quote.author} -
                <hr />
                <br />
                <UrgentInfo />
                <br />
                <div className="display-2"> Join Now! </div>
                <br />
                <CButton
                  variant="outline"
                  color="light"
                  onClick={() => props.history.push("/register")}
                >
                  CLICK TO JOIN
                </CButton>
                <CButton
                  variant="outline"
                  color="light"
                  className="mx-2"
                  onClick={() => props.history.push("/feedback")}
                >
                  Give Feedbacks
                </CButton>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </CContainer>
            </Fade>
          </div>
        </Parallax>

        <Parallax speed={12}>
          <div className="block-3 ">
            <Fade>
              {/* <CContainer> */}
              <div
                style={{
                  //   backgroundImage: `url('${bg}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "70vh",
                  textAlign: "center",
                }}
              >
                <Image2 />
              </div>
              {/* </CContainer> */}
            </Fade>
          </div>
        </Parallax>

        <Parallax speed={11}>
          <div className="block-4">
            <Fade up>
              <CContainer>
                <h5> User Ratings </h5>
                <br />
                <p
                  className="bg-light"
                  style={{
                    maxWidth: 200,
                    margin: "auto",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Rating name="size-large" value={4} size="large" readOnly />
                </p>
                <h1 className="display-3"> Our Services </h1>
                <CButton
                  variant="outline"
                  color="dark"
                  onClick={() => props.history.push("/care-x/services")}
                >
                  View Services By Care-X
                </CButton>
                <CButton
                  variant="outline"
                  color="dark"
                  className="mx-3"
                  onClick={() => props.history.push("/community/services")}
                >
                  View Services by the Community
                </CButton>
                <CButton
                  variant="outline"
                  color="dark"
                  className="mx-3"
                  onClick={() => setCheckoutModal(true)}
                >
                  Make a fund Now!
                </CButton>
              </CContainer>
            </Fade>
          </div>
        </Parallax>

        <Parallax speed={10}>
          <div className="block-5">
            <Fade>
              <div
                style={{
                  //   backgroundImage: `url('${hand}')`,
                  //   backgroundSize: "cover",
                  //   backgroundPosition: "center",
                  //   height: "70vh",
                  marginTop: -100,
                  display: "flex",
                  justifyContent: "flex-end",
                  //   paddingRight: 40,
                  //   paddingBottom: 40,
                  alignItems: "flex-end",
                }}
              >
                <CContainer>
                  <OurServicesContent landing={true} />
                </CContainer>
              </div>
            </Fade>
          </div>
        </Parallax>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
