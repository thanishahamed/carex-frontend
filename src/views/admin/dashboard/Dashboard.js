import { CCard, CCol, CRow } from "@coreui/react";
import React from "react";
import { Fade, Slide } from "react-reveal";

const Dashboard = () => {
  return (
    <>
      <Fade>
        <h1> Dashboard </h1>
        <Slide left>
          <CRow>
            <CCol sm="4">
              <CCard color="info" className="text-white p-4 text-center">
                <h3> Total Users: </h3>
                <div className="display-4"> 30 </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="success" className="text-white p-4 text-center">
                <h3> Total Services: </h3>
                <div className="display-4"> 400 </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="warning" className="text-white p-4 text-center">
                <h3> Total Funds: </h3>
                <div className="display-4">
                  {" "}
                  50000 <small>LKR</small>{" "}
                </div>
              </CCard>
            </CCol>
          </CRow>
        </Slide>

        <Slide right>
          <CRow>
            <CCol sm="4">
              <CCard color="success" className="text-white p-4 text-center">
                <h3> External officers: </h3>
                <div className="display-4"> 34 </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="danger" className="text-white p-4 text-center">
                <h3> Total Donations: </h3>
                <div className="display-4"> 201 </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="info" className="text-white p-4 text-center">
                <h3> Users: </h3>
                <div className="display-4"> 10 </div>
              </CCard>
            </CCol>
          </CRow>
        </Slide>
      </Fade>
    </>
  );
};

export default Dashboard;
