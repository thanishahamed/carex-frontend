import React from "react";

export default function InformerDetails() {
  return (
    <div>
      <h4> My Information </h4>
      <hr />
      <ul style={{ listStyle: "none" }}>
        <li> Name: {sessionStorage.getItem("name")} </li>
        <li> Address: {sessionStorage.getItem("address")} </li>
        <li> Email: {sessionStorage.getItem("email")} </li>
        <li> NIC: {sessionStorage.getItem("nic")} </li>
        <li> Telephone: {sessionStorage.getItem("telephone")} </li>
      </ul>
    </div>
  );
}
