import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CLabel,
  CTextarea,
} from "@coreui/react";
import {
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Slide, Fade } from "react-reveal";
import { useHistory } from "react-router";
import Authenticate from "src/Authenticate";
import swal from "sweetalert";

export default function Scholarships() {
  const [hideIdentity, setHideIdentity] = useState(false);
  const [inputData, setInputData] = useState({
    description: "",
    no_of_scholarships: "",
    aditionalNumber: "",
    target: "",
    worth_of_scholarship: "",
  });

  const history = useHistory();
  const user = useSelector((state) => state.user);

  const setInputDetails = (e) => {
    setInputData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const saveData = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/add-scholarship",
        {
          ...inputData,
          hideIdentity: hideIdentity,
        },
        Authenticate.header()
      )
      .then((response) => {
        swal({
          title: "Contribution Added!",
          text: "View contibutions as posts now!",
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
    <Fade>
      <Paper className="p-4 my-2">
        <h1> Fill the following form to add a scholarship </h1>
        <p>We welcome voluntory non remunerated donors.</p>
      </Paper>
      <Fade delay={200}>
        <Paper className="p-4">
          <CLabel> 1. Target (eg: Degree Programe) </CLabel>
          <br />
          <small className="mx-3">
            Select about to whom this scholarship is offered! (Who can apply for
            the scholarship)
          </small>
          <Select
            labelId="target-desc"
            id="target-desc"
            value={inputData.target}
            onChange={setInputDetails}
            name="target"
            label="Age"
            fullWidth
            className="mx-3"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"GCE O/L"}>GCE O/L</MenuItem>
            <MenuItem value={"GCE A/L"}>GCE A/L</MenuItem>
            <MenuItem value={"Higher Studies"}>Higher Studies</MenuItem>
            <MenuItem value={"Open Scholarship"}>Open Scholarship</MenuItem>
          </Select>
          <br />
          <br />
          <CLabel> 2. Number of Scholarships provided </CLabel>
          <CInput
            type="number"
            style={{ maxWidth: 100 }}
            className="mx-3"
            value={inputData.no_of_scholarships}
            onChange={setInputDetails}
            name="no_of_scholarships"
          />

          <br />
          <CLabel>
            3. Total worth of the scholarship (LKR) <small>eg: 100,000</small>
          </CLabel>
          <CInput
            type="number"
            style={{ maxWidth: 300 }}
            className="mx-3"
            value={inputData.worth_of_scholarship}
            onChange={setInputDetails}
            name="worth_of_scholarship"
          />

          <br />
          <CLabel> 4. Contact numbers. </CLabel>
          <CInput
            type="number"
            value={user.data.telephone}
            onChange={() => {}}
            style={{ maxWidth: 500 }}
            disabled
            className="mx-3"
          />
          <span className="mx-3">
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

          <br />
          <CLabel>
            5. Detailed Description About The Scholarship (Mention all
            instructions to get the scholarship clearly.)
          </CLabel>
          <CTextarea
            type="number"
            className="mx-3"
            rows={10}
            value={inputData.description}
            onChange={setInputDetails}
            name="description"
          />

          <br />
          <CLabel className="mx-3">
            <Checkbox checked={true} onChange={() => ""} color="primary" />I
            accept the terms and regulations provided by this site.
          </CLabel>

          <br />
          <CLabel className=" px-3">
            <Checkbox
              checked={hideIdentity}
              onClick={() => setHideIdentity((h) => !h)}
              color="primary"
            />
            Hide my identity when displaying the service in the community.
          </CLabel>

          <br />
          <br />

          <p align="right">
            <Button color="secondary" variant="outlined" className="mx-3">
              Reset
            </Button>
            <Button color="primary" variant="contained" onClick={saveData}>
              ADD
            </Button>
          </p>

          <br />
          <br />
          <br />
          <br />
        </Paper>
      </Fade>
    </Fade>
  );
}
