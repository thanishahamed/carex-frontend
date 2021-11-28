import { CCard, CCol, CRow } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-reveal";
import Authenticate from "src/Authenticate";
import banner from "./assets/images/undraw_dashboard.svg";
import "./assets/styles/style.css";

const line = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Feedbacks",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const doughnut = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
  datasets_2: [
    {
      data: [50, 300, 100],
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
  ],
  datasets_3: [
    {
      data: [100, 50, 300],
      backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
      hoverBackgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
    },
  ],
};

const options = {
  // tooltips: {
  //   enabled: false,
  //   custom: customTooltips
  // },
  maintainAspectRatio: false,
};
const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    loadDashboardInfo();
  }, []);

  const loadDashboardInfo = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/load-admin-dash-info",
        {},
        Authenticate.header()
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <>
      <Fade>
        <h1> Dashboard </h1>
        {/* <div className="bg_image">
          <img src={banner} />
        </div> */}
        <br />
        <Slide left>
          <CRow>
            <CCol sm="4">
              <CCard color="info" className="text-white p-4 text-center">
                <h3> Total Users: </h3>
                <div className="chart-wrapper">
                  <CChart
                    type="doughnut"
                    datasets={doughnut.datasets}
                    options={options}
                  />
                </div>
                <div className="display-4"> {data.total_users} </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="success" className="text-white p-4 text-center">
                <h3> Total Services: </h3>
                <CChart
                  type="pie"
                  datasets={doughnut.datasets_2}
                  options={options}
                />
                <div className="display-4"> {data.total_services} </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="warning" className="text-white p-4 text-center">
                <h3> Funds Raised: </h3>
                <CChart
                  type="doughnut"
                  datasets={doughnut.datasets_3}
                  options={options}
                />
                <h1>
                  {data.total_funds_raised} <small>LKR</small>
                </h1>
              </CCard>
            </CCol>
          </CRow>
        </Slide>

        <Slide right>
          <CRow>
            <CCol sm="4">
              <CCard color="success" className="text-white p-4 text-center">
                <h3> External officers: </h3>
                <CChart
                  type="doughnut"
                  datasets={doughnut.datasets_3}
                  options={options}
                />
                <div className="display-4"> {data.total_external_users} </div>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="danger" className="text-white p-4 text-center">
                <h3> Donations: </h3>
                <CChart
                  type="doughnut"
                  datasets={doughnut.datasets}
                  options={options}
                />
                <h1>
                  {data.total_donations} <small>LKR</small>
                </h1>
              </CCard>
            </CCol>

            <CCol sm="4">
              <CCard color="info" className="text-white p-4 text-center">
                <h3> Feedbacks: </h3>
                <div
                  className="chart-wrapper"
                  style={{ backgroundColor: "#fff", borderRadius: 10 }}
                >
                  <CChart
                    type="line"
                    datasets={line.datasets}
                    options={options}
                  />
                </div>
                <div className="display-4"> {data.total_feedbacks} </div>
              </CCard>
            </CCol>
          </CRow>
        </Slide>
        <div
          className="card_low_opacity"
          style={{ display: "flex", alignItems: "center" }}
        >
          <h2>Timeline: </h2>
          <marquee>
            <h4>
              {" "}
              Fund Raising Programme | Blood Donation | Scholarships | Funds |
              Donations | Organ Donations |{" "}
            </h4>
          </marquee>
        </div>
      </Fade>
    </>
  );
};

export default Dashboard;
