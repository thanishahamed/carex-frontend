import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@material-ui/core';


const summaryStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
}

export default function PostSummary(props) {
    const services = props.services;
    const [received, setReceived] = useState(0);
    const [pending, setPending] = useState(0);
    const [approved, setApproved] = useState(0);

    useEffect(()=>{
        var rc = services.filter(service => service.status === 'pending');
        setPending(rc.length);
    },[services]);

    return (
        <div style = {summaryStyle}>
            <Paper className = "urgent-info-container btn-custom text-center p-4" onClick = {()=>{}} >
                <h3> Total Interactions </h3>
                <Typography variant = "h1"> {services.length} </Typography>
            </Paper>

            <Paper className = "urgent-info-container btn-custom text-center p-4" onClick = {()=>{}} >
                <h3> Recieved </h3>
                <Typography variant = "h1"> {received} </Typography>
            </Paper>

            <Paper className = "urgent-info-container btn-custom text-center p-4" onClick = {()=>{}} >
                <h3> Pending </h3>
                <Typography variant = "h1"> {pending} </Typography>
            </Paper>

            <Paper className = "urgent-info-container btn-custom text-center p-4" onClick = {()=>{}} >
                <h3> Approved </h3>
                <Typography variant = "h1"> {approved} </Typography>
            </Paper>
        </div>
    )
}
