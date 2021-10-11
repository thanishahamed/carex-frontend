import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function UsersList(props) {
  const data = props.data;
  const history = useHistory();

  const fields = [
    { key: "id", _style: { width: "1%" } },
    { key: "name", _style: { width: "40%" } },
    { key: "nic", _style: { width: "40%" } },
    { key: "role", _style: { width: "40%" } },
    { key: "email", _style: { width: "40%" } },
    { key: "telephone", _style: { width: "40%" } },
    { key: "status", _style: { width: "40%" } },
    { key: "actions", _style: { width: "40%" } },
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
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    history.push("/user/" + item.id + "/edit");
                  }}
                >
                  Edit
                </CButton>
              </td>
            );
          },
        }}
      />
    </div>
  );
}
