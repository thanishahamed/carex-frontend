import { CInput, CLabel, CTextarea } from "@coreui/react";
import { Button, MenuItem, Paper, Select } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Authenticate from "src/Authenticate";

export default function EditUser(props) {
  const { userId } = useParams();
  const [id, setId] = useState("");
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (userId === undefined) {
      setId(props.id);
      console.log("printing use id");
    } else {
      setId(userId);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = () => {
    axios
      .get(process.env.REACT_APP_SERVER + "/user/" + id, Authenticate.header())
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error.response);
      });
  };

  const updateUser = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/user/" + id,
        data,
        Authenticate.header()
      )
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error.response);
      });
  };

  const changeText = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Paper className="p-4">
        {user.data.role === "admin" ? (
          <div>
            <CLabel> User Role </CLabel>
            <select
              className="custom-select"
              value={data.role}
              name="role"
              onChange={changeText}
            >
              <option value="admin"> Admin </option>
              <option value="subscriber"> Subscriber </option>
              <option value="staff"> Staff </option>
              <option value="extern"> Extern </option>
            </select>
            <br />
            <CLabel> Status </CLabel>
            <select
              value={data.status}
              name="status"
              className="custom-select"
              onChange={changeText}
            >
              <option value="admin"> Active </option>
              <option value="subscriber"> Blocked </option>
              <option value="staff"> Pending </option>
            </select>
            <br />
          </div>
        ) : (
          ""
        )}
        <CLabel> Full Name </CLabel>
        <CInput
          type="text"
          value={data.name}
          name="name"
          onChange={changeText}
        />
        <br />
        <CLabel> First Name </CLabel>
        <CInput
          type="text"
          value={data.f_name}
          name="f_name"
          onChange={changeText}
        />
        <br />
        <CLabel> First Name </CLabel>
        <CInput
          type="text"
          value={data.l_name}
          name="l_name"
          onChange={changeText}
        />
        <br />
        <CLabel> Description About User </CLabel>
        <CTextarea
          type="text"
          value={data.description}
          name="description"
          onChange={changeText}
        />
        <br />
        {user.data.role === "admin" ? (
          <div>
            <CLabel> Email </CLabel>
            <CInput
              type="email"
              value={data.email}
              name="email"
              onChange={changeText}
            />
            <br />
          </div>
        ) : (
          ""
        )}
        <CLabel> Telephone </CLabel>
        <CInput
          type="number"
          value={data.telephone}
          name="telephone"
          onChange={changeText}
        />
        <br />
        <CLabel> Address </CLabel>
        <CInput
          type="text"
          value={data.address}
          name="address"
          onChange={changeText}
        />
        <br />
        <CLabel> Date of birth </CLabel>
        <CInput
          type="date"
          value={moment(data.dob).format("yyyy-MM-DD")}
          name="dob"
          onChange={changeText}
        />
        <br />
        <CLabel> Gender </CLabel>
        <CInput
          type="text"
          value={data.gender}
          name="gender"
          onChange={changeText}
        />
        <br />
        {user.data.role === "admin" ? (
          <div>
            <CLabel> NIC </CLabel>
            <CInput
              type="text"
              value={data.nic}
              name="nic"
              onChange={changeText}
            />
            <br />
          </div>
        ) : (
          ""
        )}
        <CLabel> If you need to change pasword click below button </CLabel>{" "}
        <br />
        <Button color="primary" variant="outlined" size="small">
          Change Password
        </Button>
        <br />
        <div className="text-right">
          {user.data.role === "admin" ? (
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          ) : (
            ""
          )}

          <Button variant="contained" color="primary" onClick={updateUser}>
            Save
          </Button>
        </div>
      </Paper>
      <br />
      <br />
    </div>
  );
}