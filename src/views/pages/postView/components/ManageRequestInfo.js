import { CLabel, CModal, CModalBody, CModalHeader } from "@coreui/react";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Authenticate from "src/Authenticate";

export default function ManageRequestInfo(props) {
  const { data } = props;

  const donate = (orId) => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/donate-organ",
        { organId: orId, date: moment().format("yyyy-MM-DD"), data: data },
        Authenticate.header()
      )
      .then((response) => {
        props.loadData(data.service.id);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const closePost = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/close/post", {
        post_id: data.post.id,
      })
      .then((response) => {
        console.log(response.data);
        props.setManageModal(false);
        props.loadServices();
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <div>
      <CModal
        size="xl"
        show={props.manageModal}
        onClose={() => props.setManageModal(false)}
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton> Manage Service </CModalHeader>
        <CModalBody>
          <h1> Manage </h1>
          <hr />
          <strong> Request Information </strong>
          <hr />
          <center>
            <CLabel> Certification Document </CLabel>
            <br />
            <img
              src={data.service.approval_document_link}
              width="90%"
              style={{ maxWidth: "500px" }}
            />
          </center>
          <br /> <br />
          <CLabel> Description </CLabel>
          <br />
          <Alert icon={false}> {data.service.description} </Alert>
          <br />
          <br />
          <hr />
          <strong> Donation Type {data.post.category.toUpperCase()}</strong>
          <hr />
          <hr />
          <strong> Available Donations </strong>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Type</th>
                <th>Organ</th>
                <th>Receiver</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.organs.map((organ, id) => {
                return (
                  <tr key={id}>
                    <td>{organ.id}</td>
                    <td>{organ.alive_death}</td>
                    <td>{organ.organ_name}</td>
                    <td>{organ.transplanted_to}</td>
                    <td>{organ.status}</td>
                    <td>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => donate(organ.id)}
                        disabled={organ.status === "available" ? false : true}
                      >
                        {organ.status === "donated" ? "Donated" : "Donate"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button
            size="small"
            variant="contained"
            color="inherit"
            onClick={closePost}
          >
            Close Receiving Requests For This Post
          </Button>
        </CModalBody>
      </CModal>
    </div>
  );
}
