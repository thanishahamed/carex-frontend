import { Typography } from "@material-ui/core";
import React from "react";
import { Fade } from "react-reveal";

const PostsLargeContainer = (props) => {
  return (
    <div>
      <Fade delay={200}>
        <div
          className={
            "postTitle " +
            (props.category === "organ donation"
              ? "organDonation"
              : props.category === "blood donation"
              ? "bloodDonation"
              : props.category === "educational scholarship"
              ? "educational"
              : props.category === "study fund"
              ? "studyFund"
              : props.category === "community post"
              ? "communityPost"
              : "normalPost")
          }
        >
          <Typography variant="h5" component="h5">
            {" "}
            {props.title}{" "}
          </Typography>
        </div>
        <div>
          {props.banner !== "" ? (
            <img src={props.banner} width="100%" height="100%" />
          ) : (
            ""
          )}
        </div>
      </Fade>
    </div>
  );
};

export default PostsLargeContainer;
