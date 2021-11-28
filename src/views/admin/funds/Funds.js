import { CButton } from "@coreui/react";
import { Paper } from "@material-ui/core";
import axios from "axios";
import React from "react";
import Authenticate from "src/Authenticate";
import ListOfFunds from "./components/ListOfFunds";
import ListOfFundsByPost from "./components/ListOfFundsByPost";
import { saveAs } from "file-saver";

export default function Funds() {
  const downloadFundReport = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/download-funded-info",
        {},
        { ...Authenticate.header(), responseType: "blob" }
      )
      .then((response) => {
        const csvBlob = new Blob([response.data]);
        saveAs(csvBlob, `Funded Services.csv`);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <div>
      <h1> Funds Management </h1>
      <Paper className="p-4">
        <ListOfFunds />
      </Paper>

      <br />
      <br />
      <br />
      <h1> Fundable services </h1>
      <div align="right" className="pb-4">
        <CButton
          className="pull-right"
          color="success"
          onClick={downloadFundReport}
        >
          Download Funded List
        </CButton>
      </div>
      <Paper className="p-4 ">
        <ListOfFundsByPost />
      </Paper>
    </div>
  );
}
