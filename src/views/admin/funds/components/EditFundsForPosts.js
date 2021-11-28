import {
  CButton,
  CCard,
  CCardBody,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { Fade } from "react-reveal";
import React, { useState } from "react";
import ReceivedPerson from "./ReceivedPerson";
import axios from "axios";
import Authenticate from "src/Authenticate";

export default function EditFundsForPosts(props) {
  const [processing, setProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);

  const processFund = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      console.log("Processed Successfully!");
      props.loadFundsWithPosts();
      setTimeout(() => {
        startProcess();
        setProcessSuccess(true);
      }, 200);
    }, 2000);
  };

  const startProcess = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/save-funder-info",
        { ...props.data },
        Authenticate.header()
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <CModal
        size="lg"
        closeOnBackdrop={false}
        show={props.editModal}
        onClose={() => props.setEditModal(false)}
        centered
      >
        <CModalHeader closeButton>
          Manage Funds Received For This Service!
        </CModalHeader>
        <CModalBody className="text-center">
          <h2> SEND FUNDS </h2>
          <small> User Id : {props.data.user_id}</small>
          <CCard>
            <CCardBody>
              {processSuccess ? (
                <div>
                  <Fade>
                    <ReceivedPerson
                      setEditModal={props.setEditModal}
                      setProcessSuccess={setProcessSuccess}
                      loadFundsWithPosts={props.loadFundsWithPosts}
                    />
                  </Fade>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <CLabel>Amount </CLabel>
                    <CInput
                      className="mb-3"
                      type="number"
                      disabled
                      value={props.data.amount}
                    />
                  </div>
                  <div className="mb-3">
                    <CLabel>Fund Receiver </CLabel>
                    <CInput
                      className="mb-3"
                      type="text"
                      disabled
                      value={props.data.posted_by}
                    />
                  </div>
                  <div className="mb-3">
                    <CLabel> Title </CLabel>
                    <CInput
                      className="mb-3"
                      type="text"
                      disabled
                      value={props.data.title}
                    />
                  </div>
                  <div className="mb-3">
                    <CLabel> Category </CLabel>
                    <CInput
                      className="mb-3"
                      type="text"
                      disabled
                      value={props.data.category}
                    />
                  </div>
                  <CButton
                    color="success"
                    onClick={processFund}
                    // onClick={startProcess}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Process Fund"}
                  </CButton>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton> Close </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
