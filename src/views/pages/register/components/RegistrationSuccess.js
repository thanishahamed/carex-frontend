import React, { useEffect } from 'react';
import SuccessSvg from './SuccessSvg';
import { CModal, CModalBody, CModalHeader } from '@coreui/react';
import { Button, Typography } from '@material-ui/core';
import { Fade, Slide, Zoom } from 'react-reveal';
import { useHistory } from 'react-router';
import Authenticate from 'src/Authenticate';

export default function RegistrationSuccess(props) {
    const history = useHistory();

    useEffect(()=>{

    },[props.registerSuccess]);

    return (
        <div>
            <CModal
                show = {props.registerSuccess}
                onClose = {() => props.setRegisterSuccess(false)}
                centered
                // closeOnBackdrop = {false}
                size = "lg"
            >
                <CModalBody>
                    <center>
                    <Typography variant = "h2" align="center"> Registration Successful </Typography>
                    <Zoom up duration={1500}>
                    <div style = {{marginTop: -50, maxWidth: 500, margin: 'auto', }}>
                        <SuccessSvg/>
                    </div>
                    </Zoom>
                    <Fade delay ={1000} >
                    <div style = {{marginTop: -50}}>
                        <p> <strong> An email was sent to your email account. Please check the email to verify your account! </strong> </p>
                    {
                        props.addUserMethod !== 'register' ? 
                        <Button variant = "contained" onClick = {()=>{props.setRegisterSuccess(false)}}> Close </Button>
                        :
                        <Button variant = "contained" style = {{backgroundColor: 'green', color: '#fff'}} onClick = {()=>{history.push('/login')}}> Login </Button>

                    }
                    
                    </div>
                    </Fade>
                    </center>
                </CModalBody>
            </CModal>
        </div>
    )
}
