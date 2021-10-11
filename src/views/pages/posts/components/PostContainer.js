import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Fab,
  IconButton,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import "../posts.css";
import { CBadge, CButton, CCol, CRow } from "@coreui/react";
import CommentArea from "./likesAndComments/CommentArea";
import UsersComments from "./likesAndComments/UsersComments";
import LikeAreaButtonset from "./likesAndComments/LikeAreaButtonset";
import { Fade } from "react-reveal";
import moment from "moment";
import axios from "axios";

const styles = {
  mainStyle: {
    minHeight: 300,
    marginBottom: 40,
  },
};

function truncateString(string, limit) {
  if (string.length > limit) {
    return string.substring(0, limit) + "...";
  } else {
    return string;
  }
}

const PostContainer = (props) => {
  const [liked, setLiked] = useState(false);
  const history = useHistory();
  const [postBody, setPostBody] = useState([]);
  const [comments, setComments] = useState([]);
  const { post } = props;

  useEffect(() => {
    let post = props.post.body.split("\n");
    setPostBody(post);
    loadComments();
  }, []);

  const loadComments = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + props.post.id)
      .then((response) => {
        setComments(response.data.commentsWithUsers);
        // console.log("printing comments", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <Paper className="p-2 px-3 rounded-lg" style={styles.mainStyle}>
        <Fade>
          <CRow className="align-items-center" style={{ paddingTop: 10 }}>
            <CCol sm="1">
              <Avatar alt={post.user.name} src={post.profile_image} />
            </CCol>
            <CCol sm="5">
              <strong> {post.user.name} </strong> <br />
              {moment(props.post.updated_at).fromNow()}
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
                  {" "}
                  {post.status.toUpperCase()}{" "}
                </CBadge>
              </div>
            </CCol>
          </CRow>
          <hr />
          <div
            className={
              "postTitle " +
              (post.category === "organ donation"
                ? "organDonation"
                : post.category === "blood donation"
                ? "bloodDonation"
                : post.category === "educational scholarship"
                ? "educational"
                : post.category === "study fund"
                ? "studyFund"
                : post.category === "community post"
                ? "communityPost"
                : "normalPost")
            }
          >
            <h1
              className="btn-custom"
              onClick={() =>
                history.push("/services/explore/service/" + post.id)
              }
            >
              {post.title}
            </h1>
          </div>
          <div
            className="btn-custom bodyContent"
            onClick={() => history.push("/services/explore/service/" + post.id)}
          >
            <p>
              <div className="post-images-view text-center">
                {post.images.length === 1 ? (
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={post.images[0].url}
                      width="100%"
                      style={{ maxWidth: 500 }}
                      align="center"
                    />
                  </div>
                ) : (
                  <ImageList rowHeight={160} cols={3}>
                    {post.images.map((item, id) => (
                      <ImageListItem key={id} cols={id % 3}>
                        <img src={item.url} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </div>
              <p align="justify">
                <br />
                {postBody.map((body, id) => {
                  return (
                    <div key={id}>
                      {truncateString(body, 100)} <br />
                    </div>
                  );
                })}
              </p>

              <div align="right">
                <CButton
                  size="sm"
                  onClick={() =>
                    history.push("/services/explore/service/" + post.id)
                  }
                  align="right"
                >
                  Click to read more...
                </CButton>
              </div>
            </p>
          </div>
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
        </Fade>
      </Paper>
    </div>
  );
};

export default PostContainer;
