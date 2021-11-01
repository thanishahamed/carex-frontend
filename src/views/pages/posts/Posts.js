import { CCol, CContainer, CInput, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ProfileSub from "./components/ProfileSub";
import PostContainer from "./components/PostContainer";
import { Zoom, Slide, Fade } from "react-reveal";
import { Button, Chip } from "@material-ui/core";
import UrgentInfo from "./components/UrgentInfo";
import AddPost from "./components/AddPost";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useHistory } from "react-router";
import StripeCheckout from "../stripePayments/StripeCheckout";
import axios from "axios";
import VoiceAssistant from "../voiceRecognition/VoiceAssitant";
import Authenticate from "src/Authenticate";
import { useSelector } from "react-redux";
import SLNews from "./components/SLNews";
import ManageCookies from "src/ManageCookies";
import swal from "sweetalert";

const Posts = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [postsFull, setPostsFull] = useState([]);
  const [posts, setPosts] = useState([]);
  const [available, setAvailable] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/get-all-services")
      .then((response) => {
        setPosts(response.data.posts);
        setPostsFull(response.data.posts);
        setAvailable(response.data.available);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const searchData = (sText) => {
    const data = postsFull.filter((post) => post.category.includes(sText));
    if (sText === "all") {
      setPosts(postsFull);
    } else {
      setPosts(data);
    }
  };

  const searchTextFilter = (e) => {
    setSearchText(e.target.value);
    const searchData = postsFull.filter(
      (post) =>
        post.body.includes(e.target.value) ||
        post.title.includes(e.target.value)
    );

    if (e.target.value === "") {
      setPosts(postsFull);
    } else {
      setPosts(searchData);
    }
  };
  const checkToken = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/allusers`,
        {},
        Authenticate.header()
      )
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status === 401) {
          Authenticate.logout((message) => window.location.replace("/"));
        } else {
          console.log(error.response);
        }
      });
  };

  return (
    <div className="container" style={{ maxWidth: 1000 }}>
      <StripeCheckout
        open={checkoutModal}
        close={setCheckoutModal}
        name="Ahamed"
        address="Warakapola"
        mobile="94777277234"
        amount="100"
        description="Donation for carex"
        category="care-x"
        user_id={user.data.id}
        post_id={null}
      />

      <CRow size="sm">
        <CCol sm="8">
          <Fade>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setCheckoutModal(true)}
              >
                Make a fund to Care-X
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="mx-2"
                onClick={() => history.push("/care-x/services")}
              >
                Check what we did with your funds
              </Button>
              {/* <Button
                variant="outlined"
                color="primary"
                size="small"
                className="mx-2"
                onClick={checkToken}
              >
                Check Authentication
              </Button> */}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="mx-2"
                onClick={() => history.push("/services/chat-room")}
              >
                Chat Room
              </Button>
            </div>
            <br />
            <UrgentInfo />
          </Fade>
          <AddPost loadData={loadData} />
          <center>
            <Chip
              label="All"
              onClick={() => {
                searchData("all");
              }}
            />
            <Chip
              label="Organ Donations"
              onClick={() => {
                searchData("organ donation");
              }}
            />
            <Chip
              label="Blood Donations"
              onClick={() => {
                searchData("blood donation");
              }}
            />
            <Chip
              label="Educational Scholarships"
              onClick={() => {
                searchData("educational scholarship");
              }}
            />
            <Chip
              label="Study Funds"
              onClick={() => {
                searchData("study fund");
              }}
            />
          </center>
          <center>
            <div className="align-items-center">
              <SearchIcon style={{ fontSize: 35 }} />{" "}
              <CInput
                type="text"
                value={searchText}
                onChange={searchTextFilter}
                style={{ maxWidth: 300 }}
              />{" "}
            </div>
          </center>
          <br />

          {posts.map((post, id) => {
            return <PostContainer key={id} post={post} />;
          })}

          {/* <center>
            <AutorenewIcon align="center" />
          </center> */}
        </CCol>
        <CCol sm="3">
          <ProfileSub />
          <hr />
          <SLNews />
        </CCol>
      </CRow>
    </div>
  );
};

// export default React.memo(Posts);
export default Posts;
