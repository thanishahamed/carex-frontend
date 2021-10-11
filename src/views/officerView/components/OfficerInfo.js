import { Paper } from "@material-ui/core";
import React from "react";

export default function OfficerInfo(props) {
  return (
    <div>
      <h3> My Details </h3>
      <ul style={{ listStyle: "none" }}>
        <li> Name: {props.user.name} </li>
        <li> Email: {props.user.email} </li>
        <li> Address: {props.user.address} </li>
        <li> Telephone: {props.user.telephone} </li>
        <li> NIC: {props.user.nic} </li>
      </ul>
    </div>
  );
}
