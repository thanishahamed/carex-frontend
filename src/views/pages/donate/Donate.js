import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react'
import OpacityIcon from '@material-ui/icons/Opacity';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';

import './donate.css';
import { CCol, CRow } from '@coreui/react';
import { Fade, Slide } from 'react-reveal';

const Donate = (props) => {
    return (
        <Slide down>
            <Paper className = "p-4 ">
                <p align = "center">
                    <Typography variant = "h4" component = "h1"> Select your field of contribution </Typography> 
                </p>
                <p align="center"> You can select an option from the below options. You can request a service if you need a new service. We will make arrangements to give the best services for you! </p>
                <div className = "button-block-holder">
                    <div className = "block-button-donate " onClick = {()=>props.history.push('/services/donate/blood-donation')}>
                        <OpacityIcon style = {{fontSize: 70}} />  Donate Blood
                    </div>
                    <div className = "block-button-organ" onClick = {()=>props.history.push('/services/donate/organ-donation')}>
                        <BubbleChartIcon style = {{fontSize: 70}} />  Donate Organ
                    </div>
                    <div className = "block-button-body" onClick = {()=>props.history.push('/services/donate/body-donation')} >
                        <AirlineSeatFlatIcon style = {{fontSize: 70}}  />  Donate Body
                    </div>
                    <div className = "block-button-student-fund" onClick = {()=>props.history.push('/services/donate/student-fund-donation')}>
                        <CastForEducationIcon style = {{fontSize: 70}} />  Donate Educational Funds
                    </div>                    
                </div>

                <p align = "center">
                    <br/>
                    <Button variant="contained" color="primary" onClick = {()=>props.history.push('/services/request-service')}> Request for a new service </Button>
                </p>
            </Paper>
        </Slide>
    )
}

export default Donate;
