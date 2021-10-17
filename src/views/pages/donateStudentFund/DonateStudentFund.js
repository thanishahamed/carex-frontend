import React, { useState } from "react";
import { Fade } from "react-reveal";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import { CCol, CInput, CLabel, CRow, CTextarea } from "@coreui/react";
import { Button, Checkbox, Paper } from "@material-ui/core";
import axios from "axios";
import Authenticate from "src/Authenticate";
import { useSelector } from "react-redux";
import ManageCookies from "src/ManageCookies";
import { useHistory } from "react-router";
import swal from "sweetalert";

const DonateStudentFund = (props) => {
  const [hideIdentity, setHideIdentity] = useState(false);
  const [description, setDescription] = useState("");
  const [aditionalNumber, setAditionalNumber] = useState("");
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const saveFunding = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/add-student-fund",
        {
          aditionalNumber: aditionalNumber,
          description: description,
          hideIdentity: hideIdentity,
        },
        Authenticate.header()
      )
      .then((response) => {
        // console.log(response.data);
        swal("Contributed!", "We appreciate your service!", "success").then(
          (data) => history.push("/")
        );
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
      <Fade>
        <Paper className="p-4 my-2">
          <CRow>
            <CCol sm="1">
              <CastForEducationIcon
                style={{ fontSize: 70, color: "#154360" }}
              />
            </CCol>
            <CCol>
              <h4>
                Please fill this form before you proceed to donate in
                educational feilds.
              </h4>
              <p>We welcome voluntory non remunerated donors.</p>
            </CCol>
          </CRow>
        </Paper>
        <Paper className="p-4 my-2">
          <h4>
            You can contribute in this division by donating educational stuff
            for the needies.
          </h4>
          <h5> Following things can be provided. </h5>
          <ul>
            <li> Excercise Books </li>
            <li> Shoes </li>
            <li> Uniforms </li>
            <li> Stationaries </li>
            <li> etc... </li>
          </ul>

          <br />
          <CLabel className="mx-4"> 1. Explained Description. </CLabel>
          <CTextarea
            type="number"
            onChange={(e) => setDescription(e.target.value)}
            style={{ maxWidth: 800 }}
            value={description}
            rows="10"
          />
          <br />
          <br />
          <CLabel> 2. Contact numbers. </CLabel>
          <CInput
            type="number"
            value={user.data.telephone}
            onChange={() => {}}
            style={{ maxWidth: 500 }}
            disabled
            className="mx-3"
          />
          <br />
          <span className="mx-3">
            Additional Contact Number: (eg: 94777xxxxxx)
          </span>
          <CInput
            type="number"
            style={{ maxWidth: 500 }}
            value={aditionalNumber}
            onChange={(e) => setAditionalNumber(e.target.value)}
            name="aditionalNumber"
            className="mx-3"
          />

          <br />

          <CLabel className="mx-3 px-4">
            <Checkbox checked={true} onChange={() => ""} color="primary" />I
            agree to donate my organs according to the information given above.
          </CLabel>
          <CLabel className="mx-3 px-4">
            <Checkbox checked={true} onChange={() => ""} color="primary" />I
            like to show my identity in the system and posts regarding organ
            donation
          </CLabel>
          <CLabel className="mx-3 px-4">
            <Checkbox
              checked={hideIdentity}
              onClick={() => setHideIdentity((h) => !h)}
              color="primary"
            />
            Hide my identity when displaying the service in the community.
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
              {" "}
              Reset and go back{" "}
            </Button>
            <Button color="primary" variant="contained" onClick={saveFunding}>
              Contribute
            </Button>
          </p>

          <br />
          <br />
          <br />
          <br />
        </Paper>
      </Fade>
    </div>
  );
};

export default DonateStudentFund;
