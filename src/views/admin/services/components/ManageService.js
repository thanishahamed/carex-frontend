import { CModal, CModalBody, CModalFooter, CModalHeader } from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Fade } from "react-reveal";
import Loader from "src/views/alertComponents/Loader";
import PostSummary from "src/views/pages/postView/components/PostSummary";
import RequestingPeople from "src/views/pages/postView/components/RequestingPeople";

export default function ManageService(props) {
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [props.postId]);

  const loadPost = () => {
    setLoading(true);

    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + props.postId, {
        user_id: user.data.id,
      })
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  return (
    <div>
      <CModal
        show={props.show}
        onClose={() => props.setManageServiceModal(false)}
        size="xl"
        closeOnBackdrop={false}
        style={{ minHeight: 400 }}
      >
        <CModalHeader closeButton> Service Settings </CModalHeader>
        <CModalBody>
          {loading ? (
            <Loader />
          ) : (
            <Fade>
              <RequestingPeople
                requestedByPeople={post.service_requests_by_people}
                loadPost={loadPost}
                postId={props.postId}
                loadServices={props.loadServices}
              />

              {/* <PostSummary
                                services = {post.service_requests_by_people}
                            /> */}
            </Fade>
          )}
        </CModalBody>
        <CModalFooter> Care-X Social Services Community </CModalFooter>
      </CModal>
    </div>
  );
}
