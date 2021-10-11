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

export default function ListOfFunds(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState({ full: 0, carex: 0, services: 0 });
  const history = useHistory();

  useEffect(() => {
    loadFunds();
  }, []);

  const loadFunds = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/get-all-funds",
        {},
        Authenticate.header()
      )
      .then((response) => {
        setData(response.data);
        let tot = 0;
        let carex = 0;
        let services = 0;
        for (let i = 0; i < response.data.length; i++) {
          tot += parseInt(response.data[i].amount);
          if (response.data[i].category === "care-x") {
            carex += parseInt(response.data[i].amount);
          } else {
            services += parseInt(response.data[i].amount);
          }
        }
        setTotal({ full: tot, carex: carex, services: services });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const fields = [
    { key: "id", _style: { width: "1%" } },
    { key: "name", _style: { width: "40%" } },
    { key: "address", _style: { width: "40%" } },
    { key: "telephone", _style: { width: "40%" } },
    { key: "description", _style: { width: "40%" } },
    { key: "amount", _style: { width: "20%" } },
    { key: "category", _style: { width: "20%" } },
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

      <CRow>
        <CCol sm="4">
          <CCard color="info text-white">
            <CCardBody>
              <h3 align="center"> Total (LKR) </h3>
              <h3 align="center"> {total.full} </h3>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard color="success text-white">
            <CCardBody>
              <h3 align="center"> Carex (LKR) </h3>
              <h3 align="center"> {total.carex} </h3>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="4">
          <CCard color="warning text-white">
            <CCardBody>
              <h4 align="center"> Community (LKR) </h4>
              <h3 align="center"> {total.services} </h3>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

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
