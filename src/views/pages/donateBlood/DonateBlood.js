import { Button, Checkbox, MenuItem, Paper, Select } from "@material-ui/core";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import OpacityIcon from "@material-ui/icons/Opacity";
import { CBadge, CCol, CInput, CLabel, CRow, CTextarea } from "@coreui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import Authenticate from "src/Authenticate";
import { useHistory } from "react-router";
import SnackBar from "src/views/alertComponents/SnackBar";

const DonateBlood = (props) => {
  const [hideIdentity, setHideIdentity] = useState(false);
  const [inputData, setInputData] = useState({
    lastDonated: null,
    description: "none",
    bloodGroup: "",
  });
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [error, setError] = useState(false);

  const setInputDetails = (e) => {
    setInputData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const onSubmit = () => {
    setError(false);
    axios
      .post(
        process.env.REACT_APP_SERVER + "/add-blood-donation",
        { ...inputData, hideIdentity: hideIdentity },
        Authenticate.header()
      )
      .then((response) => {
        // console.log(response.data);
        history.push("/");
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          console.log(error.response);
          const errorValues = Object.values(error.response.data.errors);
          setMessage(errorValues[0][0]);
          setVariant("warning");
          setError(true);
        } else {
          console.log(error.response);
        }
      });
  };

  return (
    <Fade>
      <Paper className="p-4 my-2">
        <CRow>
          <CCol sm="1">
            <OpacityIcon style={{ fontSize: 70, color: "red" }} />
          </CCol>
          <CCol>
            <h2> Fill the following form to contribute in blood donations </h2>
            <p>We welcome voluntory non remunerated donors.</p>
          </CCol>
        </CRow>
      </Paper>

      <Paper className="p-4 my-2">
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
        <br />
        <CLabel> 2. Last donated date. (If donated only) </CLabel>
        <CInput
          type="date"
          style={{ maxWidth: 500 }}
          value={inputData.lastDonated}
          onChange={setInputDetails}
          name="lastDonated"
          className="mx-3"
        />

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

        <CBadge color="dark" className="p-2 my-4">
          Agreement (terms and conditions):
        </CBadge>
        <ul>
          <li>
            You must fulfill several criteria to be accepted as a blood donor.
            These criteria are set to ensure the safety of the donor as well as
            the quality of donated blood.
          </li>
        </ul>
        <CBadge color="light" className="p-2 my-4">
          Donor Selection Criteria
        </CBadge>
        <ol>
          <li> Age above 18 years and below 60 years.</li>
          <li>
            If previously donated, at least 4 months should be elapsed since the
            date of previous donation.
          </li>
          <li>
            Hemoglobin level should be more than 12g/dL. (this blood test is
            done prior to each blood donation)
          </li>
          <li> Free from any serious disease condition or pregnancy. </li>
          <li>
            Should have a valid identity card or any other document to prove the
            identity.
          </li>
          <li> Free from "Risk Behaviours". </li>
          <ul>
            <li>Homosexuals.</li>
            <li>Sex workers and their clients.</li>
            <li>Drug addicts.</li>
            <li>Engaging in sex with any of the above.</li>
            <li>Having more than one sexual partner</li>
          </ul>
          <br />
          <CLabel>
            <cite>
              Criteria extracted from:
              http://www.nbts.health.gov.lk/index.php/donate-blood
            </cite>
          </CLabel>
        </ol>
        <br />
        <br />

        <CLabel className="mx-3 px-4">
          <Checkbox
            checked={hideIdentity}
            onChange={() => setHideIdentity(!hideIdentity)}
            color="primary"
          />
          Hide my identity in when the fund message is posted (display as
          anonymous).
        </CLabel>

        <CLabel className="mx-3 px-4">
          <Checkbox checked={true} onChange={() => ""} color="primary" />I
          accept the following conditions meet at the time I am applying this
          form.
        </CLabel>

        <CLabel className="mx-3 px-4">
          <Checkbox checked={true} onChange={() => ""} color="primary" />I agree
          to do the tests needed to be taken when donating a blood in future.
        </CLabel>

        <br />

        <p align="left">
          <Button
            color="secondary"
            variant="outlined"
            className="mx-3"
            onClick={() => props.history.push("/services/donate")}
          >
            Reset and go back
          </Button>
          <Button color="primary" variant="contained" onClick={onSubmit}>
            Proceed to Donate
          </Button>
          {error ? (
            <SnackBar fired={true} variant={variant} message={message} />
          ) : (
            ""
          )}
        </p>

        <br />
        <br />
        <br />
      </Paper>
    </Fade>
  );
};

export default DonateBlood;
