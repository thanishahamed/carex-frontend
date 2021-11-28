import React from "react";
import { Button } from "@material-ui/core";

export default function ReceivedPerson(props) {
  const finish = () => {
    props.setEditModal(false);
    props.setProcessSuccess(false);
    props.loadFundsWithPosts();
  };
  return (
    <div>
      <h1> Funding successfull </h1>
      <div className="alert alert-success">
        The raised funds are successfully sent. Download the report in the funds
        tab.
      </div>
      <Button onClick={finish}>Done</Button>
    </div>
  );
}
