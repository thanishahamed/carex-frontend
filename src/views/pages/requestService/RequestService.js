import { CCol, CInput, CLabel, CRow, CTextarea } from "@coreui/react";
import { Button, Checkbox, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import axios from "axios";
import swal from "sweetalert";
import Authenticate from "src/Authenticate";
import { useHistory } from "react-router";

const RequestService = (props) => {
  const [data, setData] = useState({ description: "", subject: "" });
  const history = useHistory();

  const setInputs = (e) => {
    setData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const postRequest = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/add-new-service-request",
        data,
        Authenticate.header()
      )
      .then((response) => {
        swal({
          title: "Request Success!",
          text: "Your request has been placed successfully!",
          className: "text-center",
          icon: "success",
        }).then((d) => {
          history.push("/");
        });
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
            text: "Service request not updated correctly! Please try again later!",
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
              <PlaylistAddCheckIcon
                style={{ fontSize: 70, color: "#2874A6" }}
              />
            </CCol>
            <CCol>
              <h4>We welcome to here from you! Please send us your requests</h4>
              <p>voluntory non remunerated donors are mostly welcome.</p>
            </CCol>
          </CRow>
        </Paper>

        <Paper className="p-4">
          <br />
          <CLabel> 1. Subject. </CLabel>
          <CInput
            type="text"
            onChange={setInputs}
            value={data.subject}
            name="subject"
          />
          <br />
          <CLabel> 2. Explained Request Description. </CLabel>
          <CTextarea
            style={{ maxWidth: 800 }}
            rows="10"
            onChange={setInputs}
            value={data.description}
            name="description"
          />
          <br />
          <br />
          <CLabel className="">
            <Checkbox checked={true} onChange={() => ""} color="primary" />I
            agree to the terms and conditions provided by carex.
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
            <Button color="primary" variant="contained" onClick={postRequest}>
              Post Request
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

export default RequestService;
