import { CContainer, CForm, CLabel } from "@coreui/react";
import { Button, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import TheLandingPageHeader from "src/containers/TheLandingPageHeader";
import DonorsInformation from "./DonorsInformation";
import InformerDetails from "./InformerDetails";

export default function LoggedInPage(props) {
  return (
    <div>
      <TheLandingPageHeader />
      <CContainer
        style={{ paddingTop: 60 }}
        className="justify-content-center align-items-center"
      >
        <br />
        <br />
        <Button onClick={props.logout} variant="contained" color="inherited">
          Logout
        </Button>
        <br /> <br /> <br />
        <Fade>
          <Paper
            style={{
              margin: "auto",
              padding: 30,
            }}
          >
            <h1>Welcome {sessionStorage.getItem("name")}!</h1>
            <h5>
              {" "}
              A person is trusted on you in donating his/her organs. Inform the
              community about the availability now!{" "}
            </h5>
          </Paper>
        </Fade>
        <br />
        <Fade>
          <Paper
            style={{
              margin: "auto",
              padding: 30,
            }}
          >
            <InformerDetails />
          </Paper>
        </Fade>
        <br />
        <Fade>
          <Paper
            style={{
              margin: "auto",
              padding: 30,
            }}
          >
            <DonorsInformation />
          </Paper>
        </Fade>
      </CContainer>
    </div>
  );
}
