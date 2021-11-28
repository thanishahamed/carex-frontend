import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { useParams } from "react-router-dom";
import Authenticate from "src/Authenticate";
import ProfilePic from "../profile/components/ProfilePic";

export default function PublicProfile() {
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/user/" + id, Authenticate.header())
      .then((response) => {
        setUserProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <div style={styles.main}>
      <Fade>
        <div>
          <h1>Profile</h1>
          {userProfile.profile_image ? (
            <img
              style={styles.image}
              src={userProfile.profile_image}
              width="200"
              alt="profile"
            />
          ) : (
            <ProfilePic />
          )}
          <Paper style={styles.profileBody}>
            <u>Full Name</u>
            <Typography> {userProfile.name} </Typography>
            <hr />
            <u>Address</u>
            <Typography> {userProfile.address} </Typography>
            <hr />
            <u>E-mail</u>
            <Typography> {userProfile.email} </Typography>
            <hr />
            <u>Telephone</u>
            <Typography> {userProfile.telephone} </Typography>
            <hr />
            <u>Gender</u>
            <Typography> {userProfile.gender} </Typography>
            <hr />
            <u>Chat Room Name</u>
            <Typography>
              {" "}
              {userProfile.chat_room
                ? userProfile.chat_room.username
                : "Realtime Chat Disabled!"}{" "}
            </Typography>
          </Paper>
        </div>
      </Fade>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
  profileBody: {
    padding: 30,
    marginTop: 10,
    minWidth: 400,
    boxShadow: "0px 3px 8px #888888",
  },
  image: {
    boxShadow: "0px 3px 8px #888888",
    borderRadius: 1000,
  },
};
