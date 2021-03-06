import { CBadge, CInput, CLabel, CSelect } from "@coreui/react";
import { Button, Checkbox, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-reveal";
import Authenticate from "src/Authenticate";
import SnackBar from "../alertComponents/SnackBar";
import AddingSuccess from "./components/AddingSuccess";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loadUserData } from "src/store/actions/user";
import moment from "moment";

export default function AddInformer(props) {
  const [data, setData] = useState({});
  const [saved, setSaved] = useState(false);
  const [fired, setFired] = useState(false);
  const [error, setError] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "Then fill the form to add an informer"
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (props.status === "edit") {
      axios
        .post(
          process.env.REACT_APP_SERVER + "/informer/" + props.informerId,
          {},
          Authenticate.header()
        )
        .then((response) => {
          setData({
            ...response.data,
            fullName: response.data.full_name,
            password: "",
            dob: moment(response.data.dob).format("YYYY-MM-DD"),
          });
          console.log(response.data);
        })
        .catch((error) => console.log(error.response));
    } else {
      setData({
        fullName: "",
        dob: "",
        password: "",
        password_confirmation: "",
        email: "",
        address: "",
        nic: "",
        gender: "",
        telephone: "",
        dob: "",
      });
    }
  }, [props.status]);

  const saveInformer = (e) => {
    setError(false);
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_SERVER + "/register-informer",
        data,
        Authenticate.header()
      )
      .then((response) => {
        console.log(response.data);
        setSaved(true);
        setError(false);
        setMessage("Informer added succefully!");
        setVariant("success");
        setData({});
        swal
          .fire({
            title: "Informer Added!",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Go to home!",
            denyButtonText: `Stay on this page!`,
            // timer: 2000,
            // timerProgressBar: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // swal.fire("Saved!", "", "success");
              history.push("/");
            } else if (result.isDenied) {
              // swal.fire(" Deleted!", "", "info");
              dispatch(loadUserData());
            } else {
              dispatch(loadUserData());
            }
          });
      })
      .catch((error) => {
        if (error.response.data.errors) {
          // const errorNames = Object.keys(error.response.data.errors);
          const errorValues = Object.values(error.response.data.errors);
          setMessage(errorValues[0][0]);
          setVariant("warning");
          setError(true);
          // setFired(f=>!f);
        } else {
          let errorMessage = "'informers_nic_unique'";
          if (error.response.data.message.split(" ")[10] === errorMessage) {
            setMessage("Duplicate NIC found");
            setVariant("warning");
            setError(true);
          } else {
            setMessage("Some errors found! Please view the console!");
            setVariant("warning");
            setError(true);
          }
          console.log(error.response);
        }
      });
  };

  const update = (e) => {
    setError(false);
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_SERVER + "/update/informer",
        data,
        Authenticate.header()
      )
      .then((response) => {
        console.log(response.data);
        setSaved(true);
        setError(false);
        setMessage("Informer updated succefully!");
        setVariant("success");
        setData({});
        swal
          .fire({
            title: "Informer Updated!",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Go to home!",
            denyButtonText: `Stay on this page!`,
            // timer: 2000,
            // timerProgressBar: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // swal.fire("Saved!", "", "success");
              history.push("/");
            } else if (result.isDenied) {
              // swal.fire(" Deleted!", "", "info");
              dispatch(loadUserData());
            } else {
              dispatch(loadUserData());
            }
          });
      })
      .catch((error) => {
        if (error.response.data.errors) {
          // const errorNames = Object.keys(error.response.data.errors);
          const errorValues = Object.values(error.response.data.errors);
          setMessage(errorValues[0][0]);
          setVariant("warning");
          setError(true);
          // setFired(f=>!f);
        } else {
          let errorMessage = "'informers_nic_unique'";
          if (error.response.data.message.split(" ")[10] === errorMessage) {
            setMessage("Duplicate NIC found");
            setVariant("warning");
            setError(true);
          } else {
            setMessage("Some errors found! Please view the console!");
            setVariant("warning");
            setError(true);
          }
          console.log(error.response);
        }
      });
  };

  return (
    <div className="mx-2 px-2">
      {error ? (
        <SnackBar fired={fired} variant={variant} message={message} />
      ) : (
        ""
      )}
      <form name="frm" onSubmit={saveInformer}>
        <hr />
        <h4> Fill this form to add an informer </h4>
        <br />
        <CLabel> 1. Full Name of the informer. </CLabel>
        <CInput
          type="text"
          onChange={handleChange}
          value={data.fullName}
          name="fullName"
          style={{ maxWidth: 500 }}
        />

        <br />
        <CLabel> 2. Address. </CLabel>
        <CInput
          type="text"
          onChange={handleChange}
          value={data.address}
          name="address"
          style={{ maxWidth: 500 }}
        />

        <br />
        <CLabel> 3. NIC. </CLabel>
        <CInput
          type="text"
          onChange={handleChange}
          value={data.nic}
          name="nic"
          style={{ maxWidth: 500 }}
        />

        <br />
        <CLabel> 4. Gender </CLabel>
        <CSelect onChange={handleChange} value={data.gender} name="gender">
          <option value={""} disabled>
            {"SELECT"}
          </option>
          <option value={"Male"}> Male </option>
          <option value={"Female"}> Female </option>
        </CSelect>

        <br />
        <CLabel> 5. Telephone. </CLabel>
        <CInput
          type="number"
          onChange={handleChange}
          value={data.telephone}
          name="telephone"
          style={{ maxWidth: 500 }}
        />

        <br />
        <CLabel> 6. Date of Birth. </CLabel>
        <CInput
          type="date"
          onChange={handleChange}
          value={data.dob}
          name="dob"
          style={{ maxWidth: 500 }}
        />

        <br />
        <p className="mx-4 text-danger">
          <strong> Note: </strong> <br />
          Informers will have the ablity to log into the account by giving the
          email and password given by you in here to update the availablity of
          the organs to the system.
        </p>
        <br />
        <CLabel> 7. Email. </CLabel>
        <CInput
          type="email"
          onChange={handleChange}
          value={data.email}
          name="email"
          style={{ maxWidth: 400 }}
        />

        <br />
        <CLabel> 8. Password. </CLabel>
        <CInput
          type="password"
          onChange={handleChange}
          value={data.password}
          name="password"
          style={{ maxWidth: 400 }}
        />

        <br />
        <CLabel> 9. Re-Enter Password. </CLabel>
        <CInput
          type="password"
          onChange={handleChange}
          value={data.password_confirmation}
          name="password_confirmation"
          style={{ maxWidth: 400 }}
        />

        <CLabel>
          <Checkbox checked={true} onChange={() => ""} color="primary" />I trust
          this person. (you can delete, edit, or modify this person later)
        </CLabel>

        <p align="right">
          {props.status === "add" ? (
            <Button variant="contained" type="submit" color="primary">
              Save Informer
            </Button>
          ) : (
            <Button variant="contained" color="default" onClick={update}>
              Update Informer
            </Button>
          )}
        </p>
      </form>
    </div>
  );
}
