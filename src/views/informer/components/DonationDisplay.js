import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MarkAvailablity from "./MarkAvailablity";
import ProcessSuccess from "./ProcessSuccess";

export default function DonationDisplay(props) {
  const [availableModal, setAvailableModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const markedSuccess = () => {
    setSuccess(true);
    setAvailableModal(false);
  };
  console.log("Props data", props.data);
  return (
    <div>
      <Alert color="error"> CONFIDENTIAL! PLEASE HANDLE CAREFULLY!</Alert>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Blood Groud</TableCell>
              <TableCell align="right">Donation Type</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Posted On</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.data ? props.data.id : ""}
              </TableCell>
              <TableCell align="right">
                {props.data ? props.data.blood_group.toUpperCase() : ""}
              </TableCell>
              <TableCell align="right">
                {props.data ? props.data.method.toUpperCase() : ""}
              </TableCell>
              <TableCell align="right">
                {props.data ? props.data.status.toUpperCase() : ""}
              </TableCell>
              <TableCell align="right">
                {props.data ? moment(props.data.created_at).format("LLL") : ""}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setAvailableModal(true)}
                  disabled={
                    props.data
                      ? props.data.status === "informed"
                        ? true
                        : false
                      : ""
                  }
                >
                  Mark as available!
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <MarkAvailablity
        availableModal={availableModal}
        setAvailableModal={setAvailableModal}
        organId={props.data ? props.data.id : ""}
        markedSuccess={markedSuccess}
      />
      <ProcessSuccess success={success} />
    </div>
  );
}
