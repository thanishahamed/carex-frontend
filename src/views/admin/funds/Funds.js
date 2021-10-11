import { Paper } from "@material-ui/core";
import React from "react";
import ListOfFunds from "./components/ListOfFunds";
import ListOfFundsByPost from "./components/ListOfFundsByPost";

export default function Funds() {
  return (
    <div>
      <h1> Funds Management </h1>
      <Paper className="p-4">
        <ListOfFunds />
      </Paper>

      <br />
      <br />
      <br />
      <h1> Funds by Posts </h1>
      <Paper className="p-4 ">
        <ListOfFundsByPost />
      </Paper>
    </div>
  );
}
