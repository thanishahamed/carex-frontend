import { CModal } from "@coreui/react";
import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import SuccessSvg from "./SuccessSvg";

export default function ProcessSuccess(props) {
  const history = useHistory();
  return (
    <div>
      <CModal show={props.success} closeOnBackdrop={false}>
        <SuccessSvg />
        <h1 style={{ marginTop: -90 }} align="center">
          Process Successful!
        </h1>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Keep me in this page!
        </Button>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => history.push("/")}
        >
          {" "}
          Go to home page{" "}
        </Button>
      </CModal>
    </div>
  );
}
