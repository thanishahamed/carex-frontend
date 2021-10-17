import React, { useState } from "react";
import { CBadge, CCol, CInput, CLabel, CRow, CTextarea } from "@coreui/react";
import { Button, Checkbox, MenuItem, Paper, Select } from "@material-ui/core";
import AirlineSeatFlatIcon from "@material-ui/icons/AirlineSeatFlat";
import { Fade } from "react-reveal";
import { DropzoneArea } from "material-ui-dropzone";
import "./body.css";
import Confirm from "src/views/alertComponents/Confirm";
import AddInformer from "src/views/informer/AddInformer";
import { saveAs } from "file-saver";
import axios from "axios";
import Authenticate from "src/Authenticate";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const DonateBody = (props) => {
  const [hideIdentity, setHideIdentity] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [inputData, setInputData] = useState({
    description: "none",
    bloodGroup: "",
    aditionalNumber: "",
  });
  const [agreementForm, setAgreementForm] = useState(null);
  const [hospitalForm, setHospitalForm] = useState(null);
  const [error, setError] = useState(false);
  const [variant, setVariant] = useState("success");
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState(
    "Then fill the form to add an informer"
  );
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const setInputDetails = (e) => {
    setInputData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const downloadAgreement = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/organ-agreement-form",
        {},
        { ...Authenticate.header(), responseType: "blob" }
      )
      .then((response) => {
        const pdfBlob = new Blob([response.data]);
        saveAs(pdfBlob, `organDonationForm.pdf`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleAgreementUpload = (file) => {
    setAgreementForm(file[0]);
  };

  const handleHospitalUpload = (file) => {
    setHospitalForm(file[0]);
  };

  const saveBodyDonation = () => {
    var formdata = new FormData();
    // formdata.append("donateData", donateData);
    formdata.append("bloodGroup", inputData.bloodGroup);
    formdata.append("aditionalNumber", inputData.aditionalNumber);
    formdata.append("bloodGroup", inputData.bloodGroup);
    formdata.append("agreementForm", agreementForm);
    formdata.append("hospitalForm", hospitalForm);

    formdata.append("hideIdentity", hideIdentity);
    axios
      .post(
        process.env.REACT_APP_SERVER + "/add-body-donation",
        formdata,
        Authenticate.header()
      )
      .then((response) => {
        console.log(response.data);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setSaved(true);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          let message = Object.values(error.response.data.errors)[0][0];
          swal({
            title: " ",
            icon: "warning",
            text: message,
            className: "alert-warning",
            button: false,
            timer: 3000,
          });
        } else {
          swal({
            title: "Something went wrong!",
            icon: "warning",
            text: "Organ donation not updated correctly! Please try again later!",
            className: "alert-warning",
            button: false,
            timer: 3000,
          });
        }

        console.log(error.response);
      });
  };

  return (
    <div>
      <Confirm show={false} />
      <Fade>
        <Paper className="p-4 my-2">
          <CRow>
            <CCol sm="1">
              <AirlineSeatFlatIcon style={{ fontSize: 70, color: "#0B9C65" }} />
            </CCol>
            <CCol>
              <h4>
                Please fill this form before you proceed to donate your body
                after death.
              </h4>
              <p>We welcome voluntory non remunerated donors.</p>
            </CCol>
          </CRow>
        </Paper>
        <Paper className="p-3">
          <h3> You can donate your body in two methods from our site! </h3>
          <CBadge color="primary"> Method 1 </CBadge>
          <h5>
            Donate your body to a university after death (the recommended way to
            donate a body):
          </h5>
          <ul>
            <li>
              Colombo University:
              <a href="https://med.cmb.ac.lk/anatomy/body-donation/">
                Click here!
              </a>
            </li>
            <li>
              Peradeniya University:
              <a href="https://med.pdn.ac.lk/departments/anatomy/bodydonation.php">
                Click here!
              </a>
            </li>
            <li>
              Sri Jayawardanapura:
              <a href="http://www.medical.sjp.ac.lk/downloads/body-donation-form/Body%20Donation%20Form%20-%20English.pdf">
                Click here!
              </a>
            </li>
          </ul>

          {!saved ? (
            <Fade>
              <p className="p-3 text-center">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setShowDonation(!showDonation)}
                >
                  {!showDonation
                    ? "Proceed to donate with the community"
                    : "Hide"}
                </Button>
              </p>
              {showDonation ? (
                <div>
                  <hr />
                  <CBadge color="primary"> Method 2 </CBadge>
                  <br />
                  <br />
                  <h5> Donate through Care-x: </h5>
                  <br />
                  <CLabel> 1. Blood Group </CLabel>
                  <Select
                    value={inputData.bloodGroup}
                    onChange={setInputDetails}
                    label="Blood Group"
                    variant="outlined"
                    className="mx-3"
                    name="bloodGroup"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>

                  <br />
                  <CLabel> 3. Contact numbers. </CLabel>
                  <CInput
                    type="number"
                    value={user.data.telephone}
                    onChange={() => {}}
                    style={{ maxWidth: 500 }}
                    disabled
                    className="mx-3"
                  />
                  <span className="mx-3">
                    {" "}
                    Additional Contact Number: (eg: 94777xxxxxx)
                  </span>
                  <CInput
                    type="number"
                    style={{ maxWidth: 500 }}
                    value={inputData.aditionalNumber}
                    onChange={setInputDetails}
                    name="aditionalNumber"
                    className="mx-3"
                  />

                  <br />
                  <CLabel> 4. Description (Optional) </CLabel>
                  <CTextarea
                    rows={5}
                    style={{ maxWidth: 500 }}
                    value={inputData.description}
                    onChange={setInputDetails}
                    name="description"
                    className="mx-3"
                  />

                  <p className="px-4">
                    Please download the following agreement form and fill all
                    the fields.
                    <Button
                      variant="contained"
                      onClick={downloadAgreement}
                      className="mx-3"
                      color="danger"
                    >
                      Download
                    </Button>
                  </p>

                  <p className="px-4">
                    <strong>
                      Take a photo of your hand filled agreement form and attach
                      a certificate from the nearest hospital and upload.
                    </strong>
                  </p>

                  <div className="box-outlined">
                    <CRow>
                      <CCol sm="5">
                        <DropzoneArea
                          onChange={handleAgreementUpload}
                          acceptedFiles={[
                            "image/jpeg",
                            "image/png",
                            "image/bmp",
                          ]}
                          maxFileSize={5000000}
                          filesLimit={1}
                          dropzoneText={"Agreement"}
                        />
                      </CCol>
                      <CCol sm="5">
                        <DropzoneArea
                          onChange={handleHospitalUpload}
                          acceptedFiles={[
                            "image/jpeg",
                            "image/png",
                            "image/bmp",
                          ]}
                          maxFileSize={5000000}
                          filesLimit={1}
                          dropzoneText={"Hospital Certificate"}
                        />
                      </CCol>
                    </CRow>
                  </div>

                  <p className="box-outlined p-3">
                    <small>
                      <strong> Sources: </strong> <br />
                      <cite>
                        https://slja.sljol.info/articles/10.4038/slja.v27i2.8446/galley/6370/download/
                      </cite>
                      <br />
                      <cite>
                        https://slja.sljol.info/articles/abstract/10.4038/slja.v27i2.8446/
                      </cite>
                      <br />
                      <cite>
                        https://www.government.nl/topics/organ-tissue-donation/question-and-answer/if-i-am-a-registered-donor-what-will-happen-to-my-body-after-my-death
                      </cite>
                      <br />
                      <cite>
                        https://www.government.nl/topics/organ-tissue-donation/question-and-answer/donate-organ-tissue-while-alive
                      </cite>
                      <br />
                      <cite>
                        https://slja.sljol.info/articles/10.4038/slja.v27i2.8446/galley/6370/download/
                      </cite>
                    </small>
                  </p>

                  <br />
                  <br />
                  <br />
                  <CLabel className="mx-3 px-4">
                    <Checkbox
                      checked={hideIdentity}
                      onClick={() => setHideIdentity((h) => !h)}
                      color="primary"
                    />
                    Hide my identity when displaying the service in the
                    community.
                  </CLabel>
                  <br />
                  <CLabel className="mx-3 px-4">
                    <Checkbox
                      checked={true}
                      onChange={() => ""}
                      color="primary"
                    />
                    I agree to donate my organs according to the information
                    given above.
                  </CLabel>
                  <br />
                  <br />
                  <br />

                  <p align="right">
                    <Button
                      color="secondary"
                      variant="outlined"
                      className="mx-3"
                      onClick={() => props.history.push("/services/donate")}
                    >
                      Reset and go back
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={saveBodyDonation}
                    >
                      Save
                    </Button>
                  </p>
                </div>
              ) : (
                ""
              )}
            </Fade>
          ) : (
            <Fade>
              <div className="alert alert-success p-3">
                <h1 align="center">Donation Added Successfully!</h1>
                <h4 align="center">Please add an informer now!</h4>
              </div>
              <AddInformer />
            </Fade>
          )}

          <br />
          <br />
          <br />
          <br />
        </Paper>
      </Fade>
    </div>
  );
};

export default DonateBody;
