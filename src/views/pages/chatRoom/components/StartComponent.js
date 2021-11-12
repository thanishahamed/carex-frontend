import { Paper } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import Authenticate from "src/Authenticate";
import { useSelector } from "react-redux";

export default function StartComponent(props) {
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    console.log("FROM START COMPONENT");
  }, []);

  //   const viewUsers = () => {
  //     axios
  //       .get(
  //         "https://api.chatengine.io/users/",
  //         Authenticate.headerWithChatAdmin()
  //       )
  //       .then((response) => console.log(response.data))
  //       .catch((error) => console.log(error.response));
  //   };

  //   const viewChats = () => {
  //     axios
  //       .get("https://api.chatengine.io/chats/", {
  //         ...Authenticate.headerWithChatAdmin(),
  //         "Project-ID": "9818e1a5-4277-4eb7-bc47-a31ef69b668f",
  //         "User-Name": "Carex",
  //         "User-Secret": "1234",
  //       })
  //       .then((response) => console.log(response.data))
  //       .catch((error) => console.log(error.response));
  //   };

  return (
    <div>
      <Paper style={styles.mainStyle}>
        <h1>WELCOME TO REALTIME CHATS</h1>
        <h3>Do you like to join real time chat now?</h3>

        <div>
          <br />
          <strong>Terms & Conditions</strong>
          <br />
          <small>
            Please note this is a social service community! You must be carefull
            when handling the chats. If you bahave unethical, Your account will
            be suspended and community will take necessary actions.
          </small>

          <br />
          <br />
          <p>
            <h4> User Name: {user.f_name}</h4>
          </p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => props.prepareChatAccountToUser()}
          >
            Agree terms and join Real Time Chat!
          </Button>
        </div>
        {/* <Button onClick={() => addUser("John", "1234")}> ADD USER </Button>
        <Button onClick={viewChats}> GET CHATS </Button>
        <Button onClick={viewUsers}> VIEW USERS </Button>
        <Button onClick={() => addUserToChat(69073, "John")}>
          ADD USER TO CHAR ID 69073
        </Button> */}
      </Paper>
    </div>
  );
}

const styles = {
  mainStyle: { padding: 40 },
};
