import React from "react";
import { Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useHistory } from "react-router";
import "../posts.css";
import { Fade } from "react-reveal";
import moment from "moment";

export default function UrgentInfoContainer(props) {
  const history = useHistory();

  const styles = {
    blood: {
      background: "#CD6155",
      color: "white",
      padding: 10,
      paddingTop: 24,
      height: "100%",
      maxWidth: "200px",
      borderRadius: 4,
    },
    organ: {
      background: "#2E86C1",
      color: "white",
      padding: 10,
      paddingTop: 24,
      height: "100%",
      maxWidth: "200px",
      borderRadius: 4,
    },
    communityRequest: {
      background: "white",
      color: "#2471A3",
      padding: 10,
      paddingTop: 24,
      height: "100%",
      maxWidth: "200px",
      borderRadius: 4,
    },
    study: {
      background: "#3498db",
      color: "white",
      padding: 10,
      paddingTop: 24,
      height: "100%",
      maxWidth: "200px",
      borderRadius: 4,
    },
    educational: {
      background: "#f39c12",
      color: "white",
      padding: 10,
      paddingTop: 24,
      height: "100%",
      maxWidth: "200px",
      borderRadius: 4,
    },
    scholarship: {
      background: "green",
      color: "white",
      padding: 10,
      paddingTop: 24,
      height: "100%",
      maxWidth: "200px",
      borderRadius: 4,
    },
  };
  return (
    <Paper
      className="urgent-info-container btn-custom"
      elevation={4}
      onClick={() => history.push("/services/explore/service/" + props.post.id)}
    >
      {props.post ? (
        <div
          className="text-center"
          style={
            props.post.category === "organ donation"
              ? styles.organ
              : props.post.category === "blood donation"
              ? styles.blood
              : props.post.category === "scholarship"
              ? styles.educational
              : props.post.category === "study fund"
              ? styles.study
              : styles.communityRequest
          }
        >
          <Fade>
            <p
              style={{
                borderRadius: 10,
                marginTop: 5,
                backgroundColor:
                  props.post.status === "approved" ||
                  props.post.status === "approved-nf" ||
                  props.post.status === "available"
                    ? "#1D8150"
                    : props.post.status === "pending verification"
                    ? "#DA7E29"
                    : props.post.status === "closed"
                    ? "#E14D5B"
                    : "#628DAC",
                color: "white",
              }}
            >
              {props.post.status.toUpperCase()}
            </p>
            <h5>{props.post.category.toUpperCase()} </h5>
            <hr />
            <small> {props.post.title} </small>
            <small> Click Here!</small> <br />
            <small>{moment(props.post.updated_at).fromNow()}</small>
          </Fade>
        </div>
      ) : (
        ""
      )}
    </Paper>
  );
}
