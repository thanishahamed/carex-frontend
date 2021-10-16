import axios from "axios";
import React, { useEffect, useState } from "react";
import DonationDisplay from "./DonationDisplay";

export default function DonorsInformation() {
  const [data, setData] = useState({
    organDonation: [{ organDonation: {} }],
    bodyDonation: [],
    user: {},
  });
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_SERVER + "/get-donor-for-informer", {
        token: token,
        id: sessionStorage.getItem("id"),
      })
      .then((response) => {
        setData(response.data);
        console.log("organnn", response.data.organDonation[0].organ_donation);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <div>
      <h4> Donors Details</h4>

      <ul style={{ listStyle: "none" }}>
        <li>Name: {data.user.name}</li>
        <li>Address: {data.user.address}</li>
        <li>NIC: {data.user.nic}</li>
        <li>Telephone: {data.user.telephone}</li>
      </ul>
      {/* {data.organDonation.length > 0 ? (
        <DonationDisplay data={data.organDonation[0].organ_donation} />
      ) : (
        ""
      )}
      {data.bodyDonation.length > 0 ? (
        <DonationDisplay data={data.bodyDonation[0].body_donation} />
      ) : (
        ""
      )} */}
      <DonationDisplay data={data.organDonation[0].organ_donation} />
      <hr />
    </div>
  );
}
