import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import TheNavBar from "./TheNavBar";

import { BottomNavigationAction, Paper } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Auth from "../Authenticate";
import logo from "../assets/pictures/logo-color-sm.png";
import { Zoom, Slide, Fade } from "react-reveal";

const styles = {
  main: {
    marginBottom: 15,
  },
};

const PostsHeader = (props) => {
  const logout = () => {
    Auth.logout(() => window.location.replace("/"));
  };

  return (
    <CHeader withSubheader colorScheme="light" style={styles.main}>
      <Paper elevation={0} style={{ width: "100%" }}>
        <CSubheader className="px-3 justify-content-around">
          <CHeaderBrand className="mx-auto d-lg-none" to="/">
            <img src={logo} width={160} style={{ paddingLeft: 15 }} />
            <BottomNavigationAction
              label="Logout"
              icon={<ExitToAppIcon />}
              onClick={logout}
            />
          </CHeaderBrand>
          <Slide down>
            <TheNavBar />
          </Slide>
        </CSubheader>
      </Paper>
    </CHeader>
  );
};

export default PostsHeader;
