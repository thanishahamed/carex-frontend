import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  TableFooter,
  IconButton,
} from "@material-ui/core";
import { Fade } from "react-reveal";
import { CCol, CInput, CLabel, CRow } from "@coreui/react";
import ProfilePic from "./components/ProfilePic";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loadUserData } from "src/store/actions/user";
import EditUser from "src/views/admin/users/components/EditUser";
import { Alert } from "@material-ui/lab";
import AddInformerInternal from "./components/AddInformerInternal";
import { Delete, Edit, ShowChart, VisibilitySharp } from "@material-ui/icons";
import Swal from "sweetalert2";
import axios from "axios";
import Authenticate from "src/Authenticate";
import UpdateProfilePhoto from "./components/UpdateProfilePhoto";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [addInformerModal, setAddInformerModal] = useState(false);
  const [editInformer, setEditInformer] = useState(false);
  const [informerId, setInformerId] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
  }, []);

  const confirmDeleteInformer = (id) => {
    Swal.fire({
      text: "Do you want to delete informer with ID " + id + "?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInformer(id);
      } else if (result.isDenied) {
        // dispatch(loadUserData());
      }
    });
  };

  const confirmDeleteContribution = (id) => {
    Swal.fire({
      text: "Do you want to delete the contribution with ID " + id + "?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id);
      } else if (result.isDenied) {
        // dispatch(loadUserData());
      }
    });
  };

  const deletePost = (infId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER + "/destroy-post/" + infId,
        Authenticate.header()
      )
      .then((response) => {
        Swal.fire({
          title: "Deleted Successfully!",
          buttonsStyling: "none",
          timer: 3000,
          timerProgressBar: true,
        });
        dispatch(loadUserData());
      })
      .catch((error) => {
        Swal.fire({
          title: "Deleting Failed!",
          text: "Something went wrong. " + error.response.data.message,
          className: "alert-danger",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.log(error.response);
      });
  };

  const deleteInformer = (infId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER + "/destroy-informer/" + infId,
        Authenticate.header()
      )
      .then((response) => {
        Swal.fire({
          title: "Deleted Successfully!",
          buttonsStyling: "none",
          timer: 3000,
          timerProgressBar: true,
        });
        dispatch(loadUserData());
      })
      .catch((error) => {
        Swal.fire({
          title: "Deleting Failed!",
          text: "Something went wrong. " + error.response.data.message,
          className: "alert-danger",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        console.log(error.response);
      });
  };
  return (
    <div>
      <Fade>
        <Paper className="p-4 my-3">
          <h1 align="center"> Profile </h1>
          <CRow>
            <CCol sm="3">
              <Paper elevation={3} className="dp-image">
                {/* <img src = "profile" alt = "profile" /> */}
                {user.data.profile_image ? (
                  <UpdateProfilePhoto
                    image={user.data.profile_image}
                    id={user.data.id}
                  />
                ) : (
                  <div>
                    <UpdateProfilePhoto
                      image={user.data.profile_image}
                      id={user.data.id}
                    />
                  </div>
                )}
              </Paper>
              <br />
              <br />
              <div>
                {" "}
                {user.data.email_verified_at !== null ? (
                  ""
                ) : (
                  <Alert
                    icon={false}
                    color="error"
                    style={{ justifyContent: "center" }}
                  >
                    Email Not Verified <br />
                    <small>
                      {" "}
                      Check your email inbox and click verification link on the
                      email sent by Care-x
                    </small>
                  </Alert>
                )}
              </div>
            </CCol>
            <CCol sm="8">
              <EditUser id={user.data.id} />
              <span id="contributions"></span>
            </CCol>
          </CRow>
        </Paper>

        <Paper className="p-4 my-3">
          <strong> Contributions </strong>
          <hr />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Service</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.data.posts
                  ? user.data.posts.map((post) => {
                      return (
                        <TableRow key={post.id}>
                          <TableCell component="th" scope="row">
                            {post.id}
                          </TableCell>
                          <TableCell align="left">{post.title}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                history.push(
                                  "/services/explore/service/" + post.id
                                )
                              }
                            >
                              <VisibilitySharp />
                            </IconButton>

                            <IconButton
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                history.push(`edit/${post.id}/post`);
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                confirmDeleteContribution(post.id);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
              <TableFooter id="services"></TableFooter>
            </Table>
          </TableContainer>
        </Paper>

        <Paper className="p-4 my-3">
          <strong> Informers </strong>
          <br />
          <CLabel>
            {" "}
            If you are a body donor or an afterdeath organ donor. Your list of
            informers will be listed in here.{" "}
          </CLabel>
          <hr />
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => {
              setAddInformerModal(true);
              setEditInformer(false);
            }}
          >
            Add new informer
          </Button>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.data.informers
                  ? user.data.informers.map((informer) => {
                      return (
                        <TableRow key={informer.id}>
                          <TableCell component="th" scope="row">
                            {informer.id}
                          </TableCell>
                          <TableCell align="left">
                            {informer.full_name}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setInformerId(informer.id);
                                setEditInformer(true);
                                setAddInformerModal(true);
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                confirmDeleteInformer(informer.id);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
              <TableFooter id="comments"></TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Fade>
      <AddInformerInternal
        addInformerModal={addInformerModal}
        setAddInformerModal={setAddInformerModal}
        status={editInformer ? "edit" : "add"}
        informerId={informerId}
      />
    </div>
  );
}
