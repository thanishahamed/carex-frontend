import React, { useState } from "react";
import {
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CTextarea,
} from "@coreui/react";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import Authenticate from "src/Authenticate";
import { ContactPhoneOutlined } from "@material-ui/icons";

export default function CommentArea(props) {
  const [comment, setComment] = useState("");
  const postId = props.id;

  const submitComment = () => {
    if (comment === "") {
      alert("Can't submit empty comment");
    } else {
      axios
        .post(
          process.env.REACT_APP_SERVER + "/comment",
          { post_id: postId, comment: comment },
          Authenticate.header()
        )
        .then((response) => {
          console.log(response.data);
          props.loadComments();
        })
        .catch((error) => console.log(error.response));
    }
  };

  return (
    <div>
      <div className="comment-area">
        <CInputGroup>
          <CInputGroupPrepend>
            <CInputGroupText className={"bg-light text-black"}>
              Comment
            </CInputGroupText>
          </CInputGroupPrepend>
          <CTextarea
            style={{ height: 60 }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <CInputGroupAppend>
            <CInputGroupText className={"bg-light text-black"}>
              <IconButton onClick={submitComment}>
                <SendIcon style={{ fontSize: 20, color: "#0175C1" }} />
              </IconButton>
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
      </div>
    </div>
  );
}
