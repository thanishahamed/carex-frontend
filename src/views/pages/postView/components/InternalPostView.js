import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, Paper } from "@material-ui/core";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import PostsLargeContainer from "./PostsLargeContainer";
import LikeAreaButtonset from "../../posts/components/likesAndComments/LikeAreaButtonset";
import CommentArea from "../../posts/components/likesAndComments/CommentArea";
import UsersComments from "../../posts/components/likesAndComments/UsersComments";
import { useHistory, useParams } from "react-router";
import Authenticate from "src/Authenticate";
import axios from "axios";
import moment from "moment";
import RequestingPeople from "./RequestingPeople";
import PostSummary from "./PostSummary";
import { useSelector } from "react-redux";
import RequestForm from "./RequestForm";
import StripeCheckout from "../../stripePayments/StripeCheckout";
import "../../posts/posts.css";
import { Link } from "react-router-dom";

const initPost = {
  category: "Loading....",
  images: [],
  user: {},
  service_requests_by_people: [],
};

export default function InternalPostView(props) {
  const { id } = useParams();
  const [post, setPost] = useState(initPost);
  const [postBody, setPostBody] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [requestOpen, setRequestOpen] = useState(false);
  const [stripeModal, setStripeModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalFunds, setTotalFunds] = useState(0);

  const redirectBack = () => {
    history.goBack();
  };

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + id, {
        user_id: user.data.id,
      })
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
        let post = response.data.body.split("\n");
        setPostBody(post);

        let total = 0;

        for (let i = 0; i < response.data.funds.length; i++) {
          total += parseInt(response.data.funds[i].amount);
        }

        setTotalFunds(total);
      })
      .catch((error) => {
        console.log(error.response);
      });

    loadComments();
    viewPost(id);
  }, []);

  const viewPost = (id) => {
    axios
      .post(process.env.REACT_APP_SERVER + "/view", {
        post_id: id,
        user_id: user.data.id || null,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  };

  const loadComments = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + id)
      .then((response) => {
        setComments(response.data.commentsWithUsers);
        // console.log("printing comments", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <Paper>
      <div
        width="100%"
        style={{ maxWidth: 800, margin: "auto", paddingTop: 20 }}
      >
        {Authenticate.isAuthenticated() ? (
          <Button
            className="mx-4"
            variant="outlined"
            color="default"
            onClick={redirectBack}
          >
            <ArrowBackIcon /> Back
          </Button>
        ) : (
          ""
        )}
        <Paper className="p-4 my-4">
          <br />
          <div>
            <CRow>
              <CCol sm="8">
                Posted by:
                <Link to={`/services/user/${post.user.id}`}>
                  {post.user.name}
                </Link>
                on {moment(post.created_at).format("LLL")}
              </CCol>
              <CCol>
                <div align="right">
                  <CBadge
                    color={
                      post.status === "pending verification" ||
                      post.status === "pending"
                        ? "warning"
                        : post.status === "available" ||
                          post.status === "approved" ||
                          post.status === "approved-nf"
                        ? "success"
                        : "primary"
                    }
                  >
                    {post.status ? post.status.toUpperCase() : ""}
                  </CBadge>
                </div>
              </CCol>
            </CRow>
          </div>
          <hr />
          <br />
          <h1 align="center"> {post.category.toUpperCase()} </h1>
          <br />
          <CContainer>
            <PostsLargeContainer
              title={post.title}
              category={post.category || ""}
              status={post.status || ""}
              banner={post.images.length > 0 ? post.images[0].url : ""}
            />

            <p align="justify">
              <br />
              {postBody.map((body, id) => {
                return (
                  <span key={id}>
                    {body} <br />
                  </span>
                );
              })}
            </p>

            {Authenticate.isAuthenticated() &&
            (post.status === "available" ||
              post.status === "approved" ||
              post.status === "approved-nf") ? (
              <p align="center">
                <Button
                  color="inherit"
                  variant="contained"
                  onClick={() => setRequestOpen(true)}
                >
                  Request Now!
                </Button>
              </p>
            ) : (
              ""
            )}

            {post.status === "approved" ? (
              <CCard style={{ width: 300 }}>
                <CCardBody>
                  <h4> Funds (LKR): {totalFunds} </h4>
                </CCardBody>
              </CCard>
            ) : (
              ""
            )}
            <hr />
            <StripeCheckout
              open={stripeModal}
              close={setStripeModal}
              name={user.data.name}
              address={user.data.address}
              mobile={user.data.telephone}
              amount="0"
              description=""
              category="service"
              user_id={user.data.id}
              post_id={post.id}
            />

            {post.status === "approved" ? (
              <div align="center">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setStripeModal(true)}
                >
                  Fund This Service Now
                </Button>
              </div>
            ) : (
              ""
            )}
            <hr />
            <p align="center">
              {post.images.length > 0
                ? post.images.map((image, id) => {
                    if (id === 0) {
                      return "";
                    }
                    return (
                      <img
                        style={{ maxWidth: "500px" }}
                        key={image.id}
                        src={image.url}
                        alt={"Post Image"}
                        width="100%"
                      />
                    );
                  })
                : ""}
            </p>
            {Authenticate.isAuthenticated() ? (
              <div>
                <RequestForm
                  requestOpen={requestOpen}
                  setRequestOpen={setRequestOpen}
                  postId={post.id}
                />
                <hr />
                <LikeAreaButtonset
                  title={post.title}
                  body={post.body}
                  id={post.id}
                  type={post.category}
                  loadComments={loadComments}
                />

                <CommentArea id={post.id} loadComments={loadComments} />
                <hr />

                <UsersComments
                  id={post.id}
                  comments={comments}
                  loadComments={loadComments}
                />
              </div>
            ) : (
              <CCard>
                <CCardBody>
                  <h3 align="center" className="my-4">
                    Please Signin or Signup and Come Back
                  </h3>
                  <p align="center">
                    {" "}
                    To interact with this service, please create an account and
                    login. If already registered, please login and comeback!{" "}
                  </p>
                  <CContainer style={{ width: 300 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                      className="my-4"
                    >
                      <CButton
                        color="info"
                        onClick={() => history.push("/login")}
                      >
                        {" "}
                        Sign In{" "}
                      </CButton>
                      <CButton
                        color="dark"
                        onClick={() => history.push("/register")}
                      >
                        {" "}
                        Sign Up{" "}
                      </CButton>
                    </div>
                  </CContainer>
                </CCardBody>
              </CCard>
            )}
          </CContainer>
        </Paper>

        {/* <Paper className="p-4 my-4">
          <RequestingPeople
            requestedByPeople={post.service_requests_by_people}
          />
        </Paper>

        <Paper className="p-4 my-4">
          <PostSummary services={post.service_requests_by_people} />
        </Paper> */}
      </div>
    </Paper>
  );
}
