import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ListServices from "./components/ListServices";

export default function Services(props) {
  return (
    <div>
      <h3> MANAGE SERVICES CREATED BY THE COMMUNITY </h3>
      <Paper className="p-4 my-3">
        <ListServices />
      </Paper>
    </div>
  );
}
