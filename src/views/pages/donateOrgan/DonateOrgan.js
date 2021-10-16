import { CBadge, CCol, CInput, CLabel, CRow } from "@coreui/react";
import {
  Button,
  Checkbox,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import { DropzoneArea } from "material-ui-dropzone";
import "./organ.css";
import { saveAs } from "file-saver";
import axios from "axios";
import Authenticate from "src/Authenticate";
import AddInformer from "../../informer/AddInformer";
import { Alert } from "@material-ui/lab";
import DonateSuccess from "./components/DonateSuccess";
import { useHistory } from "react-router";
import SnackBar from "src/views/alertComponents/SnackBar";

const initialStates = {
  donateData: {
    bloodGroup: "",
    aditionalNumber: "",
  },
  brainDeathOrgans: {
    heart: false,
    kidney: false,
    liver: false,
    lungs: false,
    pancrease: false,
    intestines: false,
    skin: false,
    bloodVessels: false,
    eyeTissues: false,
    heartValves: false,
    boneTissue: false,
  },
  aliveOrgans: {
    kidney: false,
    partOfTheLiver: false,
    partOfTheLungs: false,
    stemCells: false,
    boneMarrow: false,
  },
};

const DonateOrgan = (props) => {
  const [donateData, setDonateData] = useState(initialStates.donateData);
  const [brainDeathOrgans, setBrainDeathOrgans] = useState(
    initialStates.brainDeathOrgans
  );
  const [aliveOrgans, setAliveOrgans] = useState(initialStates.aliveOrgans);
  const [agreementForm, setAgreementForm] = useState(null);
  const [hospitalForm, setHospitalForm] = useState(null);
  const [hideIdentity, setHideIdentity] = useState(false);
  const [saved, setSaved] = useState(false);
  const [postId, setPostId] = useState("0");
  const [fired, setFired] = useState(false);
  const [error, setError] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "Then fill the form to add an informer"
  );
  const history = useHistory();

  const handleChange = (e) => {
    setDonateData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleBraindeathChange = (e) => {
    setBrainDeathOrgans((d) => ({ ...d, [e.target.name]: e.target.checked }));
  };

  const handleAliveChange = (e) => {
    setAliveOrgans((d) => ({ ...d, [e.target.name]: e.target.checked }));
  };

  const handleAgreementUpload = (file) => {
    setAgreementForm(file[0]);
  };

  const handleHospitalUpload = (file) => {
    setHospitalForm(file[0]);
  };

  const saveDonation = () => {
    setError(false);
    var formdata = new FormData();
    // formdata.append("donateData", donateData);
    formdata.append("bloodGroup", donateData.bloodGroup);
    formdata.append("aditionalNumber", donateData.aditionalNumber);
    formdata.append("heart", brainDeathOrgans.heart);
    formdata.append("kidney", brainDeathOrgans.kidney);
    formdata.append("liver", brainDeathOrgans.liver);
    formdata.append("lungs", brainDeathOrgans.lungs);
    formdata.append("pancrease", brainDeathOrgans.pancrease);
    formdata.append("intestines", brainDeathOrgans.intestines);
    formdata.append("skin", brainDeathOrgans.skin);
    formdata.append("bloodVessels", brainDeathOrgans.bloodVessels);
    formdata.append("eyeTissues", brainDeathOrgans.eyeTissues);
    formdata.append("heartValves", brainDeathOrgans.heartValves);
    formdata.append("boneTissue", brainDeathOrgans.boneTissue);

    formdata.append("alive_kidney", aliveOrgans.kidney);
    formdata.append("alive_partOfTheLiver", aliveOrgans.partOfTheLiver);
    formdata.append("alive_partOfTheLungs", aliveOrgans.partOfTheLungs);
    formdata.append("alive_stemCells", aliveOrgans.stemCells);
    formdata.append("alive_boneMarrow", aliveOrgans.boneMarrow);

    formdata.append("agreementForm", agreementForm);
    formdata.append("hospitalForm", hospitalForm);

    formdata.append("hideIdentity", hideIdentity);

    axios
      .post(
        process.env.REACT_APP_SERVER + "/add-organ-donation",
        formdata,
        Authenticate.header()
      )
      .then((response) => {
        setSaved(true);
        setPostId(response.data.id);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          // const errorNames = Object.keys(error.response.data.errors);
          const errorValues = Object.values(error.response.data.errors);
          setMessage(errorValues[0][0]);
          setVariant("warning");
          setError(true);
        } else {
          console.log(error.response);
        }
      });
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

  return (
    <div>
      {error ? (
        <SnackBar fired={fired} variant={variant} message={message} />
      ) : (
        ""
      )}

      <Fade>
        <Paper className="p-4 my-2">
          <CRow>
            <CCol sm="1">
              <BubbleChartIcon style={{ fontSize: 70, color: "orange" }} />
            </CCol>
            <CCol>
              <h4>
                Please fill this form before you proceed to donate an organ
                after death or after brain death
              </h4>
              <p>We welcome voluntory non remunerated donors.</p>
            </CCol>
          </CRow>
        </Paper>

        <Paper className="p-4 my-2">
          {saved ? (
            <DonateSuccess />
          ) : (
            <div>
              <br />
              <CLabel> 1. Blood Group: </CLabel>
              <Select
                value={donateData.bloodGroup}
                name="bloodGroup"
                onChange={handleChange}
                label="Blood Group"
                variant="outlined"
                className="mx-3"
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
              <br />
              <CLabel> 2. Select the organs you wish to donate: </CLabel>
              <ul>
                <li>
                  <h5> After death or brain death </h5>
                </li>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.heart}
                        name="heart"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Heart
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.kidney}
                        name="kidney"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Kidneys
                    </CLabel>
                  </CCol>

                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.liver}
                        name="liver"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Liver
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.lungs}
                        name="lungs"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Lungs
                    </CLabel>
                  </CCol>

                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.pancrease}
                        name="pancrease"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Pancrease
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.intestines}
                        name="intestines"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Intestines
                    </CLabel>
                  </CCol>

                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.skin}
                        name="skin"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      The skin
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.bloodVessels}
                        name="bloodVessels"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Blood vessels
                    </CLabel>
                  </CCol>

                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.eyeTissues}
                        name="eyeTissues"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Eye Tissues
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.heartValves}
                        name="heartValves"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Heart valves
                    </CLabel>
                  </CCol>

                  <CCol sm="6">
                    <CLabel>
                      <Checkbox
                        value={brainDeathOrgans.bondeTissue}
                        name="boneTissue"
                        onClick={handleBraindeathChange}
                        color="primary"
                      />
                      Bone Tissue (Including tendons and cartilage)
                    </CLabel>
                  </CCol>
                </CRow>

                <li>
                  <h5> While Alive </h5>
                </li>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={aliveOrgans.kidney}
                        name="kidney"
                        onClick={handleAliveChange}
                        color="primary"
                      />
                      1 Kidney
                    </CLabel>
                  </CCol>

                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={aliveOrgans.partOfTheLiver}
                        name="partOfTheLiver"
                        onClick={handleAliveChange}
                        color="primary"
                      />
                      Part of the Liver
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={aliveOrgans.partOfTheLungs}
                        name="partOfTheLungs"
                        onClick={handleAliveChange}
                        color="primary"
                      />
                      Part of the Lungs
                    </CLabel>
                  </CCol>

                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={aliveOrgans.stemCells}
                        name="stemCells"
                        onClick={handleAliveChange}
                        color="primary"
                      />
                      Stem Cells
                    </CLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="4">
                    <CLabel>
                      <Checkbox
                        value={aliveOrgans.boneMarrow}
                        name="boneMarrow"
                        onClick={handleAliveChange}
                        color="primary"
                      />
                      Bone Marrow
                    </CLabel>
                  </CCol>
                </CRow>
              </ul>

              <br />
              <CLabel> 3. Additional Contact Number </CLabel>
              <CInput
                type="number"
                name="aditionalNumber"
                value={donateData.aditionalNumber}
                onChange={handleChange}
                style={{ maxWidth: 500 }}
                className="mx-3"
              />
              <br />

              <CBadge color="dark" className="p-2 my-4">
                Conditions for donating living organ/tissue
              </CBadge>

              <p className="px-4" align="justify">
                Living organ/tissue donation is becoming more common, partly
                because there are so many people on the waiting list for
                transplants. Living organ donation is regulated by strict rules:
                Donation may not cause lasting damage to the health of the
                donor. In very exceptional circumstances, this condition may be
                waived, for instance if the recipient is in a critical condition
                and there are no alternative donors. Children and young people
                under 18 years of age may only donate organs and tissue that can
                grow back again, such as stem cells (bone marrow) or part of the
                liver. The donor may not receive payment for the donation. The
                donor must not have been put under pressure to donate an organ
                or tissue.
              </p>

              <p className="px-4">
                Please download the following agreement form and fill all the
                fields.
                <Button
                  variant="contained"
                  className="mx-3"
                  color="danger"
                  onClick={downloadAgreement}
                >
                  Download
                </Button>
              </p>

              <p className="px-4">
                <strong>
                  Take a photo of your hand filled agreement form and attach a
                  certificate from the nearest hospital and upload.
                </strong>
              </p>

              <div className="box-outlined">
                <CRow>
                  <CCol sm="5">
                    <DropzoneArea
                      onChange={handleAgreementUpload}
                      acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                      maxFileSize={5000000}
                      filesLimit={1}
                      dropzoneText={"Agreement"}
                    />
                  </CCol>
                  <CCol sm="5">
                    <DropzoneArea
                      onChange={handleHospitalUpload}
                      acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                      maxFileSize={5000000}
                      filesLimit={1}
                      dropzoneText={"Hospital Certificate"}
                    />
                  </CCol>
                </CRow>
              </div>

              <br />

              <CBadge color="warning" className="p-2 my-4">
                Medical reasons for not becoming a transplant donor
              </CBadge>
              <p>
                Even if you are a registered donor, your organs or tissue may be
                rejected after your death for medical reasons, for instance if
                you:
              </p>
              <ul>
                <li> Had blood poisoning (sepsis) </li>
                <li> Were infected with a virus </li>
                <li>
                  Acquired a tattoo or piercing in the 6 months before your
                  death.
                </li>
              </ul>

              <CBadge color="light" className="p-2 my-4">
                Donation only when the donor dies in hospital
              </CBadge>
              <p>
                Organ donation is only possible when the donor has died in
                hospital. Organs need a supply of oxygen-rich blood to remain
                suitable for transplantation. Donors are put on artificial
                respiration to keep their heart beating, so that oxygen-rich
                blood continues to circulate through their body.
                <br />
                <br /> By contrast, tissue donation is often possible if the
                donor dies in a non-hospital setting.
              </p>

              <CBadge color="light" className="p-2 my-4">
                Age of donors
              </CBadge>
              <p>
                There is no general age limit. Although the heart of an
                80-year-old person would be too old for transplantation, their
                skin might still be suitable.
              </p>

              <p className="box-outlined p-3">
                <small>
                  <strong> Sources: </strong> <br />
                  <a
                    target="_blank"
                    href="https://slja.sljol.info/articles/10.4038/slja.v27i2.8446/galley/6370/download/"
                  >
                    Cite 1
                  </a>
                  <br />
                  <a
                    target="_blank"
                    href="https://slja.sljol.info/articles/abstract/10.4038/slja.v27i2.8446/"
                  >
                    Cite 2
                  </a>
                  <br />
                  <a
                    target="_blank"
                    href="https://www.government.nl/topics/organ-tissue-donation/question-and-answer/if-i-am-a-registered-donor-what-will-happen-to-my-body-after-my-death"
                  >
                    Cite 3
                  </a>
                  <br />
                  <a
                    target="_blank"
                    href="https://www.government.nl/topics/organ-tissue-donation/question-and-answer/donate-organ-tissue-while-alive"
                  >
                    Cite 4
                  </a>
                  <br />
                  <a
                    target="_blank"
                    href="https://slja.sljol.info/articles/10.4038/slja.v27i2.8446/galley/6370/download/"
                  >
                    Cite 5
                  </a>
                </small>
              </p>
              <CLabel className="mx-3 px-4">
                <Checkbox
                  checked={hideIdentity}
                  onClick={() => setHideIdentity((h) => !h)}
                  color="primary"
                />
                Hide my identity when displaying the service in the community.
              </CLabel>
              <br />
              <CLabel className="mx-3 px-4">
                <Checkbox checked={true} onChange={() => ""} color="primary" />I
                agree to donate my organs according to the information given
                above.
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
                  onClick={saveDonation}
                >
                  Save
                </Button>
              </p>
            </div>
          )}

          <AddInformer />
          <Button
            color="inherited"
            variant="contained"
            size="small"
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>

          <Button
            color="primary"
            variant="contained"
            size="small"
            disabled={!saved}
            onClick={() => history.push("/services/explore/service/" + postId)}
          >
            View post
          </Button>
          <br />
          <br />
          <br />
          <br />
        </Paper>
      </Fade>
    </div>
  );
};

export default DonateOrgan;
