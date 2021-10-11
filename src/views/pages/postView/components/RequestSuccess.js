import { CHeader, CModal, CModalHeader } from "@coreui/react";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { Fade, Zoom } from "react-reveal";
import { useHistory } from "react-router";
import RequestSuccessSvg from "./RequestSuccessSvg";

export default function RequestSuccess(props) {
  const history = useHistory();
  return (
    <div>
      <CModal
        show={props.requestSuccessModal}
        onClose={() => props.setRequestSuccessModal(false)}
        closeOnBackdrop={false}
      >
        <Zoom>
          <center>
            <RequestSuccessSvg />
          </center>
        </Zoom>

        <h1 align="center">Request Placed!</h1>
        <Fade>
          <Alert color="warning">
            {" "}
            Your request is pending! You will receive a confirmation email and a
            call from care-x. Thank You!{" "}
          </Alert>
        </Fade>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Back to services!
        </Button>
      </CModal>
    </div>
  );
}
