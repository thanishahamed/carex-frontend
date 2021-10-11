import { Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function DonationInfo(props) {
  return (
    <div>
      <h2 align="center">
        <Alert color="error" icon={false}>
          CONFIDENTIAL, YOU RECEIVED THIS EMAIL LINK BECAUSE THIS EMAIL IS
          REGISTERED AS A AGREEMENT APPROVAL EMAIL, IF THIS EMAIL IS PROVIDED
          INCORRECT PLEASE INFORM US TO CARE-X.
        </Alert>
        <Alert color="success" icon={false}>
          If you are the correct person, Please refer the following information
          provided by the donor and approve the donation or reject.
        </Alert>
      </h2>
      <center>
        <Paper className="m-3 p-3" elevation={4}>
          <h3> Organ Donation Agreement By Care-X </h3>
          <hr />
          <img
            src={props.data.organDonation.agreement_link}
            alt="agreement"
            width={"100%"}
            style={{ maxWidth: "500px" }}
          />
        </Paper>
        <Paper className="m-3 p-3" elevation={4}>
          <h3> Nearest Hospital Certification Submitted by the donor </h3>
          <hr />
          <img
            src={props.data.organDonation.hospital_certificate_link}
            alt="hospital certificate"
            width={"100%"}
            style={{ maxWidth: "500px" }}
          />
        </Paper>
        <Paper className="m-3 p-3" elevation={4}>
          <h3> Final informer certificate (Submitted by the informer) </h3>
          <hr />
          <img
            src={props.data.organDonation.informer_proof_certificate}
            alt="hospital certificate"
            width={"100%"}
            style={{ maxWidth: "500px" }}
          />
        </Paper>
      </center>
    </div>
  );
}
