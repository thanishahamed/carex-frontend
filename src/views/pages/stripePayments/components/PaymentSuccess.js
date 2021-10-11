import { CModal } from "@coreui/react";
import { Button } from "@material-ui/core";
import React from "react";
import { Slide, Zoom } from "react-reveal";
import SuccessSvg from "./SuccessSvg";

export default function PaymentSuccess(props) {
  return (
    <CModal show={true} closeOnBackdrop={false}>
      <Slide down>
        <SuccessSvg />
      </Slide>
      <Zoom>
        <h1 align="center" style={{ marginTop: -40 }}>
          FUNDING SUCCESSFUL!
        </h1>
        <h4 align="center"> Thank you for your contribution </h4>
        <br /> <br /> <br />
      </Zoom>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          props.close(false);
          props.setSaved(false);
        }}
      >
        Back to Home
      </Button>
    </CModal>
  );
}
