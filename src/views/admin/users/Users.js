import { CContainer } from "@coreui/react";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Authenticate from "src/Authenticate";
import AddUser from "./components/AddUser";
import LoggedInUsers from "./components/LoggedInUsers";
import UsersList from "./components/UsersList";

export default function Users() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [showAddUserModal]);

  const loadUsers = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/allusers",
        {},
        Authenticate.header()
      )
      .then((response) => setData(response.data));
  };
  return (
    <div>
      <CContainer>
        <AddUser
          showAddUserModal={showAddUserModal}
          setShowAddUserModal={setShowAddUserModal}
          loadUsers={loadUsers}
        />

        <div className="text-right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAddUserModal(true)}
          >
            {" "}
            Add user{" "}
          </Button>
        </div>
        <h2> COMMUNITY USERS </h2>
        <Paper className="p-4 my-3">
          <UsersList data={data} />
        </Paper>

        <h2> LOGGED IN USERS </h2>
        <Paper className="p-4 my-3">
          <LoggedInUsers />
        </Paper>
      </CContainer>
    </div>
  );
}
