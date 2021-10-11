import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import { Button, Typography } from '@material-ui/core';

export default function VerifyEmail() {
    const { id } = useParams();
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState("Verifying...");
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_SERVER}/verify-email`, {id: id, time: moment().format()})
        .then(response => {
            console.log(response);
            if(response.data === "Already Verified") {
                setMessage(response.data);
            }else{
                setMessage(response.data);
            }
            setVerified(true);
        })
        .catch(error => console.log(error.response));
    },[]);

    return (
        <div style = {{display:'flex', justifyContent: 'center', alignItems:'center', height: '100vh', textAlign: 'center'}}>
            <div>
                <Typography variant = "h1"> {message} </Typography>
                <Button variant = "contained" color = "primary" onClick = {()=>window.location.replace('/login')}> Login </Button>
            </div>
        </div>
    )
}
