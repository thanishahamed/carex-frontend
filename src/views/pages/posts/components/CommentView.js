import { CCol, CRow } from "@coreui/react";
import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function CommentView(props) {
  const [comment, setComment] = useState({ user: { name: "" }, comment: {} });

  useEffect(() => {
    setComment(props.comment);
    // console.log("consoling comment ", props.comment);
  }, [props.comment]);

  return (
    <div className="comment-view px-4">
      <CRow className="justify-content-space-around align-items-center">
        <CCol sm="1">
          <Avatar
            alt={`${comment.user.name || "name"}`}
            src={comment.user.profile_image || "/static/images/avatar/1.jpg"}
          />
        </CCol>
        <CCol className="px-4">
          <strong> {comment.user.name} </strong>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="1"></CCol>
        <CCol className="px-4">
          <p> {comment.comment.comment} </p>
        </CCol>
      </CRow>
    </div>
  );
}
