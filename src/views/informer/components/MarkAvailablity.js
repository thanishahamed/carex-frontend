import {
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTextarea,
} from "@coreui/react";
import { Button, LinearProgress } from "@material-ui/core";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import moment from "moment";
import React, { useState } from "react";
import SnackBar from "src/views/alertComponents/SnackBar";

export default function MarkAvailablity(props) {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const proceed = () => {
    setError(false);
    if (description === "" || file === null) {
      setMessage("Description field must be filled");
      setSaving(false);
      setVariant("warning");
      setError(true);
    } else {
      setSaving(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("informer_proof_certificate", file);
      formData.append("informer_id", sessionStorage.getItem("id"));
      formData.append("informed_on", moment().format("YYYY-MM-DD hh:mm:ss")); //2021-09-15 21:59:33
      formData.append("status", "informed");
      formData.append("organ_id", props.organId);

      axios
        .post(
          process.env.REACT_APP_SERVER + "/update-donor-by-informer",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              let perc = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(perc);
              console.log(perc);
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          props.markedSuccess();
          setSaving(false);
          setError(false);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            var errors = Object.values(error.response.data.errors);
            setMessage(errors[0]);
            setError(true);
            setSaving(false);
            setVariant("warning");
          } else {
            console.log(error.response);
          }
        });
    }

    // setMessage("Please fill all fields");
  };
  return (
    <div>
      <CModal
        show={props.availableModal}
        onClose={() => props.setAvailableModal(false)}
        closeOnBackdrop={false}
        centered={true}
      >
        <CModalHeader closeButton> CONFIDENTIAL! </CModalHeader>
        <CModalBody>
          <CLabel>
            Description (Mandotary) <br />
            hint: Tell something about what's happened to the donor.
          </CLabel>
          <CTextarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <br />
          <CLabel>
            Proof Document (Hand written or a doctors' certificate)
          </CLabel>
          <DropzoneArea
            onChange={(file) => {
              setFile(file[0]);
            }}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            maxFileSize={5000000}
            filesLimit={1}
            dropzoneText={"Upload any certification document by taking a photo"}
          />
          <br />
          <center>
            {saving ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : (
              ""
            )}

            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={proceed}
              disabled={saving}
            >
              {saving ? "Securely processing please wait... " : "Proceed"}
            </Button>
          </center>
        </CModalBody>
        {error ? <SnackBar variant={variant} message={message} /> : ""}
      </CModal>
    </div>
  );
}
