import { CContainer } from "@coreui/react";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TheLandingPageHeader from "src/containers/TheLandingPageHeader";
import DonatedTo from "./components/DonatedTo";
import DonationInfo from "./components/DonationInfo";
import OfficerInfo from "./components/OfficerInfo";

export default function OfficerView() {
  const { id, userId } = useParams();
  const [data, setData] = useState({ post: {}, organDonation: {}, user: {} });
  const [approved, setApproved] = useState(false);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER +
          "/verify-donation-by-officer/" +
          id +
          "/" +
          userId
      )
      .then((response) => {
        // console.log("officer view", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("officer view error", error.response);
      });
  };
  const approve = () => {
    setApproving(true);
    axios
      .post(process.env.REACT_APP_SERVER + "/approveOrganDonation", data)
      .then((response) => {
        console.log(response.data);
        loadData();
        setApproving(false);
      })
      .catch((error) => {
        console.log(error.response);
        setApproving(false);
      });
  };
  return (
    <div>
      <TheLandingPageHeader />
      <div style={{ paddingTop: 100 }}>
        <CContainer>
          <h1>
            {("Requesting Approval For " + data.post.category).toUpperCase()}
          </h1>

          <Paper className="p-4">
            <OfficerInfo user={data.user} />
          </Paper>

          <Paper className="p-4 my-3">
            <DonationInfo data={data} />
          </Paper>

          <div className="text-right">
            <Button
              onClick={approve}
              disabled={
                approving ||
                approved ||
                data.organDonation.status === "available"
              }
              variant="contained"
              color="secondary"
            >
              {approved || data.organDonation.status === "available"
                ? "Approved"
                : approving
                ? "Approving..."
                : "Approve Donation"}
            </Button>
          </div>
          <Paper className="p-4 my-3">
            <DonatedTo />
          </Paper>
        </CContainer>
      </div>
    </div>
  );
}
