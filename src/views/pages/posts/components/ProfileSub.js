import { CircularProgress, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const styles = {
  mainStyle: {
    minHeight: 200,
  },
};

export default function ProfileSub() {
  const [data, setData] = useState({ Global: {} });
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.covid19api.com/summary")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <div>
      <Paper className="p-2 px-3 rounded-lg" style={styles.mainStyle}>
        <h5 align="center" style={{ color: "darkred" }}>
          COVID 19 GLOBAL SUMMARY
        </h5>
        {loading ? (
          <center>
            {" "}
            <CircularProgress color="inherit" />{" "}
          </center>
        ) : (
          <div>
            <center>
              <small>
                <strong>Updated {moment(data.Global.Date).fromNow()}</strong>
              </small>
            </center>
            <hr />
            <p> New Confirmed: {data.Global.NewConfirmed}</p>
            <p> New Deaths: {data.Global.NewDeaths}</p>
            <p> New Recovered: {data.Global.NewRecovered}</p>
            <p> Total Confirmed: {data.Global.TotalConfirmed}</p>
            <p> Total Deaths: {data.Global.TotalDeaths}</p>
            <p> Total Recovered: {data.Global.TotalRecovered}</p>
          </div>
        )}
      </Paper>
    </div>
  );
}
