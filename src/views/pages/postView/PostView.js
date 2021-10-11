import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { useParams, useHistory } from "react-router";

import "./post-view.css";
import "../posts/posts.css";

import Authenticate from "src/Authenticate";
import PostsHeader from "src/containers/PostsHeader";
import ThePostsSideBar from "src/containers/ThePostsSideBar";
import InternalPostView from "./components/InternalPostView";
import axios from "axios";

const PostView = () => {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    if (Authenticate.isAuthenticated()) {
      window.scrollTo(0, 0);
    } else {
      history.push(`/care-x/explore/services/${id}`);
    }
  }, []);

  return (
    <div>
      <Fade>
        <div className="c-app c-default-layout">
          <ThePostsSideBar />
          <div className="c-wrapper">
            <PostsHeader />
            <div className="c-body">
              <div className="c-app c-default-layout">
                <div className="c-wrapper">
                  <div className="c-body px-2">
                    <CRow>
                      <CCol sm="9">
                        <InternalPostView />
                      </CCol>
                      <CCol sm="3"></CCol>
                    </CRow>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default PostView;
