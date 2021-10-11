import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Authenticate from "src/Authenticate";

export default function LoggedInUsers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/loggedusers",
        {},
        Authenticate.header()
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  const fields = [
    { key: "id", _style: { width: "1%" } },
    { key: "token_id", _style: { width: "1%" } },
    { key: "name" },
    { key: "last_used" },
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

  return (
    <div>
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
                <CButton
                  color="warning"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {}}
                >
                  Edit
                </CButton>

                <CButton
                  color="info"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {}}
                >
                  Logout
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {}}
                >
                  Block
                </CButton>
              </td>
            );
          },
        }}
      />
    </div>
  );
}
