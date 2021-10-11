import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CDataTable,
  CRow,
} from "@coreui/react";
import { Button, IconButton, Typography } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Authenticate from "src/Authenticate";

export default function ListOfFundsByPost(props) {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loadFundsWithPosts();
  }, []);

  const loadFundsWithPosts = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/get-all-funds-with-posts",
        {},
        Authenticate.header()
      )
      .then((response) => {
        setData(response.data.postWithTotalFunds);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const fields = [
    { key: "id", _style: { width: "1%" } },
    { key: "posted_by", _style: { width: "40%" } },
    { key: "category", _style: { width: "40%" } },
    { key: "title", _style: { width: "40%" } },
    { key: "amount", _style: { width: "40%" } },
    { key: "actions", _style: { width: "20%" } },
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

  return (
    <div>
      <br />

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
                    // history.push("/services/explore/service/" + item.id);
                  }}
                >
                  <Visibility />
                </IconButton>

                <IconButton size="small" onClick={() => {}}>
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
