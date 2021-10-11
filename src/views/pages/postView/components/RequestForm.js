import {
  CButton,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CTextarea,
} from "@coreui/react";
import { Button, LinearProgress } from "@material-ui/core";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";
import Authenticate from "src/Authenticate";
import SnackBar from "src/views/alertComponents/SnackBar";
import RequestSuccess from "./RequestSuccess";

export default function RequestForm(props) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [requestSuccessModal, setRequestSuccessModal] = useState(false);
  const [data, setData] = useState({
    description: "",
    name: "",
    nic: "",
    address: "",
  });
  const [file, setFile] = useState("");

  const textChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const fileChange = (files) => {
    setFile(files[0]);
  };

  const saveRequest = () => {
    setError(false);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", data.name);
    formData.append("nic", data.nic);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("post_id", props.postId);
    axios
      .post(process.env.REACT_APP_SERVER + "/create/request", formData, {
        onUploadProgress: (progressEvent) => {
          let perc = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(perc);
          // console.log(perc);
        },
        ...Authenticate.header(),
      })
      .then((response) => {
        console.log(response.data);
        setRequestSuccessModal(true);
      })
      .catch((error) => {
        if (error.response.data) {
          let errors = Object.values(error.response.data.errors);
          setMessage(errors[0][0]);
          setVariant("warning");
          setError(true);
        } else {
          console.log(error.response);
        }
      });
  };
  return (
    <div>
      <CModal
        show={props.requestOpen}
        onClose={() => props.setRequestOpen(false)}
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton> Request this service </CModalHeader>
        <CModalBody>
          <RequestSuccess
            requestSuccessModal={requestSuccessModal}
            setRequestSuccessModal={setRequestSuccessModal}
          />
          <CLabel> 1. Description about the need </CLabel>
          <CTextarea
            rows={5}
            value={data.description}
            name="description"
            onChange={textChange}
          />
          <br />
          <CLabel>2. Name of the receiver</CLabel>
          <CInput value={data.name} name="name" onChange={textChange} />
          <br />
          <CLabel>3. Nic</CLabel>
          <CInput value={data.nic} name="nic" onChange={textChange} />
          <br />
          <CLabel>4. Address</CLabel>
          <CInput value={data.address} name="address" onChange={textChange} />
          <br />
          <CLabel>
            5. Proof Document (Can be a request letter or a certificate from
            trusted person or hospital with signature)
          </CLabel>
          <DropzoneArea
            onChange={fileChange}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            maxFileSize={2000000}
            filesLimit={1}
            dropzoneText={"Upload proof document here"}
          />
          <br />
          <LinearProgress variant="determinate" value={progress} />
          {error ? <SnackBar variant={variant} message={message} /> : ""}

          <br />
          <div className="text-center">
            <Button variant="contained" color="primary" onClick={saveRequest}>
              Request
            </Button>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
}
