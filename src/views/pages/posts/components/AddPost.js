import React, { useState } from "react";
import { Fab, Paper } from "@material-ui/core";
import "../posts.css";
import AddPostContents from "./AddPostContents";

export default function AddPost(props) {
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <div className="add-post-container">
      <Fab
        color="dark"
        variant="extended"
        aria-label="add"
        size="medium"
        onClick={() => setShowPostModal(true)}
      >
        Create a service request as a Post
      </Fab>
      <br />
      <AddPostContents
        showPostModal={showPostModal}
        setShowPostModal={setShowPostModal}
        loadData={props.loadData}
      />
    </div>
  );
}
