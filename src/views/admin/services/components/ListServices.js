import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import { Button, IconButton } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ManageService from "./ManageService";

export default function ListServices(props) {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [manageServiceModal, setManageServiceModal] = useState(false);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/get-all-services")
      .then((response) => setData(response.data.posts))
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleManageService = (pid) => {
    setPostId(pid);
    setManageServiceModal(true);
  };
  const fields = [
    { key: "id", _style: { width: "1%" } },
    { key: "title", _style: { width: "40%" } },
    { key: "category", _style: { width: "40%" } },
    { key: "status", _style: { width: "40%" } },
    { key: "actions", _style: { width: "40%" } },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "approved":
        return "success";
      case "approved-nf":
        return "success";
      case "informed":
        return "info";
      case "pending":
        return "warning";
      case "pending verification":
        return "warning";
      case "closed":
        return "danger";

      default:
        return "primary";
    }
  };

  return (
    <div>
      <br />
      {manageServiceModal ? (
        <ManageService
          show={manageServiceModal}
          setManageServiceModal={setManageServiceModal}
          postId={postId}
          loadServices={loadServices}
        />
      ) : (
        ""
      )}

      <CDataTable
        items={data}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={10}
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
                <IconButton
                  size="small"
                  onClick={() => {
                    history.push("/services/explore/service/" + item.id);
                  }}
                >
                  <Visibility />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => handleManageService(item.id)}
                >
                  <Edit />
                </IconButton>
              </td>
            );
          },
        }}
      />
    </div>
  );
}
