import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CLabel,
  CTextarea,
} from "@coreui/react";
import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Authenticate from "src/Authenticate";
import Swal from "sweetalert2";
import ManageRequestInfo from "./ManageRequestInfo";

export default function RequestingPeople(props) {
  const data = props.requestedByPeople;
  const [manageModal, setManageModal] = useState(false);
  const [loadedData, setLoadedData] = useState({
    service: {},
    post: { category: "" },
    organs: [],
  });
  const [post, setPost] = useState({ user: {}, images: [] });
  const [status, setStatus] = useState("");

  const fields = [
    { key: "user_id", _style: { width: "1%" } },
    { key: "post_id", _style: { width: "1%" } },
    { key: "name", _style: { width: "40%" } },
    { key: "nic", _style: { width: "40%" } },
    { key: "address", _style: { width: "40%" } },
    { key: "status", _style: { width: "10%" } },
    { key: "description", _style: { width: "40%" } },
    { key: "actions" },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  useEffect(() => {
    loadPostData();
  }, []);

  const setManagableInfo = (i) => {
    setManageModal(true);
    loadData(i);
  };

  const approveOrUnApprove = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/approve/post",
        { postId: post.id, status: status },
        Authenticate.header()
      )
      .then((response) => {
        Swal.fire({
          showConfirmButton: false,
          title: "Status Updated!",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
    props.loadServices();
  };

  const loadPostData = () => {
    let id = props.postId;
    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + id)
      .then((response) => {
        setPost(response.data);
        setStatus(response.data.status);
        console.log("Please get the output please", response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const loadData = (i) => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/findRequestInfo",
        { requestId: i },
        Authenticate.header()
      )
      .then((response) => {
        console.log("loaded data", response.data);
        setLoadedData(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <ManageRequestInfo
        manageModal={manageModal}
        setManageModal={setManageModal}
        data={loadedData}
        loadData={loadData}
        loadServices={props.loadServices}
      />

      <br />
      {post.category === "community request" ? (
        ""
      ) : (
        <div>
          <h3> PEOPLE WHO ARE INTERESTED IN THIS SERVICE </h3>
          <CDataTable
            items={data}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              actions: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => setManagableInfo(item.id)}
                    >
                      Manage
                    </CButton>
                  </td>
                );
              },
            }}
          />
        </div>
      )}

      <hr />

      <div align="right">
        <select
          value={status}
          name="status"
          className="custom-select"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="approved"> Approved </option>
          <option value="approved-nf"> Approved-NF</option>
          <option value="pending verification"> Pending Verification</option>
          <option value="suspended"> Suspended </option>
          <option value="closed"> Closed </option>
        </select>
        <Button
          color="primary"
          variant="contained"
          onClick={approveOrUnApprove}
        >
          Update Status
        </Button>
      </div>
      <div style={{ fontSize: 15, padding: 10 }}>
        <table className="table">
          <tbody>
            <tr>
              <th>Posted By</th>
              <td>: {post.user.name}</td>
            </tr>
            <tr>
              <th>NIC</th>
              <td>: {post.user.nic}</td>
            </tr>
            <tr>
              <th>Contact Number</th>
              <td>: {post.user.telephone}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>: {post.user.gender}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>: {post.user.address}</td>
            </tr>
            <tr>
              <th>Posted Category</th>
              <td>: {post.category}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>
                <pre>: {post.body} </pre>
              </td>
            </tr>
            <tr>
              <th>Images</th>
              <td>
                :
                {post.images.map((image, id) => (
                  <div style={{ textAlign: "center" }}>
                    <img
                      key={id}
                      src={image.url}
                      width="100%"
                      style={{ maxWidth: 500 }}
                      align="center"
                    />
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>

        {post.organ_donation ? (
          <div style={{ textAlign: "center" }}>
            <hr />
            <h3 style={{ fontSize: 15 }}>Hospital Certificate:</h3>
            <img
              src={post.organ_donation.hospital_certificate_link}
              width="100%"
              style={{ maxWidth: 500 }}
              align="center"
            />
            <hr />
            <h3 style={{ fontSize: 15 }}>Care-X Agreement Form:</h3>
            <img
              src={post.organ_donation.agreement_link}
              width="100%"
              style={{ maxWidth: 500 }}
              align="center"
            />
          </div>
        ) : (
          ""
        )}
        {console.log("from the bottom", post)}
      </div>
    </div>
  );
}
