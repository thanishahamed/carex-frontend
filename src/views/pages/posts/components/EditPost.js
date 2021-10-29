import { CButton, CInput, CTextarea } from "@coreui/react";
import { Button, Paper } from "@material-ui/core";
import {
  ArrowBack,
  BackspaceRounded,
  KeyboardReturn,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Authenticate from "src/Authenticate";
import Swal from "sweetalert2";

export default function EditPost(props) {
  const { id } = useParams();
  const [data, setData] = useState({
    comments: {},
    likes: {},
    views: {},
    shares: {},
  });
  const history = useHistory();

  const updatePost = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/update-post",
        data,
        Authenticate.header()
      )
      .then((response) => {
        Swal.fire({
          title: "Updated Successfully!",
          buttonsStyling: "none",
          timer: 3000,
          icon: "success",
          showConfirmButton: false,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Warning!",
          text:
            "Something went wrong. " + error.response.data
              ? Object.values(error.response.data.errors)[0][0]
              : error.response.data.message,
          class: "alert-warning",
          icon: "warning",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  const updateScholarship = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/update-scholarship",
        data.scholarship,
        Authenticate.header()
      )
      .then((response) => {
        Swal.fire({
          title: "Updated Successfully!",
          buttonsStyling: "none",
          timer: 3000,
          icon: "success",
          showConfirmButton: false,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Warning!",
          text:
            "Something went wrong. " + error.response.data
              ? Object.values(error.response.data.errors)[0][0]
              : error.response.data.message,
          class: "alert-warning",
          icon: "warning",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  const updateText = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const updateScholarshipInfo = (e) => {
    setData((d) => ({
      ...d,
      scholarship: { ...d.scholarship, [e.target.name]: e.target.value },
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + id)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className="container">
      <Button onClick={() => history.goBack()}>
        <ArrowBack /> Go back
      </Button>
      <h1> Manange Contribution </h1>
      <Paper elevation={0} style={styles.cardStyle}>
        <table className="table">
          <tbody>
            <tr>
              <th width="200px">Title: </th>
              <td colSpan={4}>
                <CInput value={data.title} onChange={updateText} name="title" />{" "}
              </td>
            </tr>
            <tr>
              <th>Content: </th>
              <td colSpan={4}>
                <CTextarea
                  rows={6}
                  value={data.body}
                  onChange={updateText}
                  name="body"
                />{" "}
              </td>
            </tr>
            <tr>
              <th>Category: </th>
              <td colSpan={4}> {data.category}</td>
            </tr>
            <tr>
              <th align="right">Views : {data.views.length} </th>
              <th align="right">Comments : {data.comments.length}</th>
              <th align="right">Likes : {data.likes.length}</th>
              <th align="right">Shares : {data.shares.length}</th>
            </tr>
          </tbody>
        </table>
        <div align="right">
          <CButton color="info" variant="outline" onClick={updatePost}>
            SAVE
          </CButton>
        </div>
      </Paper>

      {data.scholarship ? (
        <Paper elevation={3} style={styles.cardStyle}>
          <h4> Scholarship </h4>
          <table className="table">
            <tbody>
              <tr>
                <th width="200px">Target </th>
                <td colSpan={4}>: {data.scholarship.target}</td>
              </tr>
              <tr>
                <th>Description </th>
                <td colSpan={4}>
                  <CTextarea
                    rows={5}
                    value={data.scholarship.description}
                    onChange={updateScholarshipInfo}
                    name="description"
                  />
                </td>
              </tr>
              <tr>
                <th width="200px">No of Scholarships </th>
                <td colSpan={4}>
                  <CInput
                    type="number"
                    value={data.scholarship.no_of_scholarships}
                    onChange={updateScholarshipInfo}
                    name="no_of_scholarships"
                  />
                </td>
              </tr>
              <tr>
                <th width="200px">Worth of the scholarship </th>
                <td colSpan={4}>
                  <CInput
                    type="number"
                    value={data.scholarship.worth_of_scholarship}
                    onChange={updateScholarshipInfo}
                    name="worth_of_scholarship"
                  />
                </td>
              </tr>
              <tr>
                <th width="200px">Additional Contact </th>
                <td colSpan={4}>
                  <CInput
                    type="number"
                    value={data.scholarship.additional_contact}
                    onChange={updateScholarshipInfo}
                    name="additional_contact"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div align="right">
            <CButton color="info" variant="outline" onClick={updateScholarship}>
              {" "}
              SAVE{" "}
            </CButton>
          </div>
        </Paper>
      ) : (
        ""
      )}
    </div>
  );
}

const styles = {
  cardStyle: {
    minHeight: 300,
    width: "100%",
    margin: "10px 0px 10px 0px",
    padding: 20,
  },
};
