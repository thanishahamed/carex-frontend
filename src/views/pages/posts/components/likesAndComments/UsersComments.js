import { CBadge } from "@coreui/react";
import React from "react";
import CommentView from "../CommentView";

export default function UsersComments(props) {
  return (
    <div>
      <div className="users-comments-container">
        <CBadge color="light">Comments</CBadge>
        <br /> <br />
        {props.comments.map((com, id) => (
          <CommentView key={id} comment={com} />
        ))}
      </div>
    </div>
  );
}
