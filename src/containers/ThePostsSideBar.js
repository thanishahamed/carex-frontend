import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CHeader,
  CHeaderBrand,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Zoom, Slide, Fade } from "react-reveal";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import logo from "../assets/pictures/logo-color-sm.png";

import { Avatar, Button, IconButton, Paper } from "@material-ui/core";
import { useHistory } from "react-router";
import ProfilePic from "src/views/pages/profile/components/ProfilePic";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import { Link } from "react-router-dom";

const styles = {
  main: {
    marginBottom: 15,
  },
};

const navigation = [
  {
    _tag: "CSidebarNavItem",
    name: "Profile",
    to: "/user/profile",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Profile Manager"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Login",
    to: "/user",
    icon: "cil-user",
  },
];

const ThePostsSideBar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [hide, setHide] = useState(false);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random")
      .then((response) => setQuote(response.data))
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      colorScheme="light"
      style={{
        backgroundColor: "rgba(100,100,100,0)",
        border: "none",
        color: "black",
      }}
    >
      <CSidebarBrand
        className="d-md-down-none"
        onClick={() => history.push("/")}
      >
        <CHeader colorScheme="light" style={{ maxWidth: 260 }}>
          <Paper elevation={0} style={{ width: "100%" }}>
            <CHeaderBrand to="/">
              <Slide left>
                <img src={logo} width={150} style={{ paddingLeft: 15 }} />
              </Slide>
            </CHeaderBrand>
          </Paper>
        </CHeader>
      </CSidebarBrand>
      <CSidebarNav>
        <br />
        <div className="px-2">
          <div
            className="cursor-pointer"
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => history.push("/services/profile")}
          >
            <Avatar alt="Thanish Ahamed" src="/static/images/avatar/1.jpg" />
            {hide ? "" : <h5 className="px-2"> </h5>}
          </div>

          {hide ? (
            ""
          ) : (
            <div style={{ textAlign: "center" }}>
              {user.data.profile_image === null ? (
                <ProfilePic />
              ) : (
                <Link to="/services/profile">
                  <img
                    src={user.data.profile_image}
                    width="90%"
                    alt="profile"
                    style={{ borderRadius: 200 }}
                  />
                </Link>
              )}
              <br /> <br />
              <h4> Welcome </h4>
              <h5> {user.data.name} </h5>
              <div>
                {" "}
                {user.data.email_verified_at !== null ? (
                  ""
                ) : (
                  <Alert
                    icon={false}
                    color="error"
                    style={{ justifyContent: "center" }}
                  >
                    Email Not Verified <br />
                    <small>
                      {" "}
                      Check your email inbox and click verification link on the
                      email sent by Care-x
                    </small>
                  </Alert>
                )}
              </div>
              <hr />
              <h5> A quote for you {user.data.f_name}! </h5>
              {quote.content ? (
                <div>
                  <Fade delay={100}>
                    <div
                      style={{
                        borderRadius: 5,
                        padding: 5,
                        fontFamily: "gegorian",
                        fontSize: 18,
                      }}
                    >
                      <p align="center">{quote.content}</p>
                      {"- " + quote.author + " -"}
                    </div>
                  </Fade>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <br />
          <br />
          <p align="center">
            {user.data.role === "admin" ? (
              <IconButton
                color="inherit"
                variant="contained"
                onClick={() => history.push("/user")}
              >
                {" "}
                <SupervisedUserCircleIcon style={{ fontSize: 40 }} />{" "}
              </IconButton>
            ) : (
              ""
            )}
          </p>
        </div>

        {/* <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        /> */}
      </CSidebarNav>
      <div onClick={() => setHide(!hide)}>
        <CSidebarMinimizer
          className="c-d-md-down-none"
          style={{ minWidth: hide ? 49 : 256 }}
        />
      </div>
    </CSidebar>
  );
};

export default React.memo(ThePostsSideBar);
