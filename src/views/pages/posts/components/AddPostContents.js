import React, { useState } from "react";
import { CModal, CModalBody, CModalFooter, CModalHeader } from "@coreui/react";
import { CInput, CLabel, CTextarea } from "@coreui/react";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import ClearAll from "@material-ui/icons/ClearAll";
import {
  Fab,
  ImageList,
  ImageListItem,
  LinearProgress,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import "../posts.css";
import axios from "axios";
import Authenticate from "src/Authenticate";
import { useSelector } from "react-redux";
import SnackBar from "src/views/alertComponents/SnackBar";

export default function AddPostContents(props) {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [data, setData] = useState({ title: "", body: "" });
  const [message, setMessage] = useState("Share what you think or need!");
  const [fired, setFired] = useState(false);
  const [variant, setVariant] = useState("success");
  const [progress, setProgress] = useState(0);
  const [posting, setPosting] = useState(false);

  const updateImages = (files) => {
    setImages((prev) => [...prev, ...files]);
    setOpen(false);
    setProgress(0);
  };

  const clear = () => {
    setImages([]);
    setData({ title: "", body: "" });
  };
  const createPost = async () => {
    try {
      setPosting(true);
      let postData = new FormData();

      images.map((image, id) => postData.append(`image${id}`, image));
      postData.append("body", data.body);
      postData.append("title", data.title);
      postData.append("user_id", user.data.id);

      const response = await axios.post(
        process.env.REACT_APP_SERVER + "/create/post",
        postData,
        {
          onUploadProgress: (progressEvent) => {
            let perc = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(perc);
            console.log(perc);
          },
          ...Authenticate.header(),
        }
      );
      //   console.log(response.data);
      props.loadData();
      setPosting(false);
      props.setShowPostModal(false);
    } catch (error) {
      if (error.response.data) {
        let errorsNew = Object.values(error.response.data.errors);
        setMessage(errorsNew[0][0]);
        setVariant("warning");
        setFired((f) => !f);
        setPosting(false);
      } else {
        console.log(error.response);
        setPosting(false);
      }
    }
  };

  const handleChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };
  return (
    <CModal
      show={props.showPostModal}
      onClose={() => props.setShowPostModal(false)}
      centered={true}
      closeOnBackdrop={false}
      className="add-post-modal-view"
    >
      <CModalHeader closeButton>Create Post</CModalHeader>
      <CModalBody>
        <div className="post-images-view text-center">
          <ImageList rowHeight={160} cols={3}>
            {images.map((item, id) => (
              <ImageListItem key={id} cols={id % 3}>
                <img src={URL.createObjectURL(item)} />
              </ImageListItem>
            ))}
          </ImageList>
        </div>

        <br />
        <hr />

        <CLabel> Title: </CLabel>
        <CInput
          type="text"
          style={{ fontSize: 20 }}
          onChange={handleChange}
          name="title"
          value={data.title}
        />
        <CLabel> Body: </CLabel>
        <CTextarea
          style={{ height: "100px" }}
          onChange={handleChange}
          name="body"
          value={data.body}
        />

        <SnackBar variant={variant} message={message} fired={fired} />
        <br />
        <LinearProgress variant="determinate" value={progress} />
      </CModalBody>
      <CModalFooter>
        <div className="button-sets">
          <Fab
            color="primary"
            aria-label="add"
            size="medium"
            onClick={() => setOpen(true)}
          >
            <ImageIcon />
          </Fab>

          <Fab variant="extended" size="medium" onClick={clear}>
            <ClearAll />
            Clear All
          </Fab>

          <Fab
            variant="extended"
            color="secondary"
            onClick={createPost}
            disabled={posting}
          >
            <SendIcon />
            {posting ? "Creating request as a post" : "Create Post"}
          </Fab>

          <DropzoneDialog
            acceptedFiles={["image/*"]}
            cancelButtonText={"cancel"}
            submitButtonText={"Save"}
            maxFileSize={2000000}
            open={open}
            filesLimit={5}
            onClose={() => setOpen(false)}
            onSave={(files) => {
              updateImages(files);
            }}
            showPreviews={true}
            showFileNamesInPreview={true}
          />
        </div>
      </CModalFooter>
    </CModal>
  );
}
