import { Paper } from "@material-ui/core";
import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function StartComponent(props) {
  const user = useSelector((state) => state.user.data);

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
      </Paper>
    </div>
  );
}

const styles = {
  mainStyle: { padding: 40 },
};
