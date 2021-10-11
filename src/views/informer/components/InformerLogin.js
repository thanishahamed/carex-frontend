import { CContainer, CForm, CLabel } from "@coreui/react";
import { Button, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import TheLandingPageHeader from "src/containers/TheLandingPageHeader";

export default function InformerLogin(props) {
  return (
    <div>
      <TheLandingPageHeader />
      <CContainer
        style={{ paddingTop: 60 }}
        className="justify-content-center align-items-center"
      >
        <br /> <br /> <br />
        <Fade>
          <Paper
            style={{
              maxWidth: 600,
              margin: "auto",
              padding: 30,
              textAlign: "center",
            }}
          >
            <CForm onSubmit={props.login}>
              <h1 align="center"> Login as an informer </h1>
              <br />
              <TextField
                value={props.email}
                onChange={props.textChange}
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                required
              />
              <br /> <br />
              <TextField
                value={props.password}
                type="password"
                name="password"
                onChange={props.textChange}
                label="Password"
                variant="outlined"
                size="small"
                fullWidth
                required
              />
              <br /> <br />
              <Button variant="contained" type="submit" color="primary">
                Login
              </Button>
            </CForm>
          </Paper>
        </Fade>
      </CContainer>
    </div>
  );
}
