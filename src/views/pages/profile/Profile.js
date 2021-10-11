import React, { useEffect } from "react";
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

export default function Profile() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserData());
  }, []);

  return (
    <div>
      <Fade>
        <Paper className="p-4 my-3">
          <h1 align="center"> Profile </h1>
          <CRow>
            <CCol sm="3">
              <Paper elevation={3} className="dp-image">
                {/* <img src = "profile" alt = "profile" /> */}
                <ProfilePic />
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
              {/* <h5> Contributions: 0 </h5>
              <h5> Posts: 0 </h5> */}
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
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                history.push(
                                  "/services/explore/service/" + post.id
                                )
                              }
                            >
                              {" "}
                              View{" "}
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {}}
                            >
                              {" "}
                              Hide{" "}
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {}}
                            >
                              {" "}
                              Edit{" "}
                            </Button>
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

        {/* <Paper className="p-4 my-3">
          <strong> Received Services </strong>
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
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                history.push(
                                  "/services/explore/service/" + post.id
                                )
                              }
                            >
                              {" "}
                              View{" "}
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {}}
                            >
                              {" "}
                              Hide{" "}
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {}}
                            >
                              {" "}
                              Edit{" "}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
              <TableFooter id="informers"></TableFooter>
            </Table>
          </TableContainer>
        </Paper> */}

        <Paper className="p-4 my-3">
          <strong> Informers </strong>
          <br />
          <CLabel>
            {" "}
            If you are a body donor or an afterdeath organ donor. Your list of
            informers will be listed in here.{" "}
          </CLabel>
          <hr />
          <Button size="small" variant="outlined" color="primary">
            {" "}
            Add new informer{" "}
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
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                history.push(
                                  "/services/explore/service/" + informer.id
                                )
                              }
                            >
                              {" "}
                              View{" "}
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => {}}
                            >
                              {" "}
                              Edit{" "}
                            </Button>
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

        {/* <Paper className="p-4 my-3">
          <strong> Comments </strong>
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
                <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    {1}
                  </TableCell>
                  <TableCell align="left">{"Blood Donation"}</TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" color="primary">
                      {" "}
                      View{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter id="likes"></TableFooter>
            </Table>
          </TableContainer>
        </Paper>

        <Paper className="p-4 my-3">
          <strong> Likes </strong>
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
                <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    {1}
                  </TableCell>
                  <TableCell align="left">{"Blood Donation"}</TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" color="primary">
                      {" "}
                      View{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper> */}
      </Fade>
    </div>
  );
}
