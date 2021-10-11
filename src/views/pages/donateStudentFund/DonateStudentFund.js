import React from 'react'
import { Fade } from 'react-reveal';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import { CCol, CLabel, CRow, CTextarea } from '@coreui/react';
import { Button, Checkbox, Paper } from '@material-ui/core';

const DonateStudentFund = (props) => {
    return (
        <div>
            <Fade>
                <Paper className = "p-4 my-2" >
                    <CRow>
                        <CCol sm = "1">
                            <CastForEducationIcon style = {{fontSize: 70, color: '#154360'}} />
                        </CCol>
                        <CCol>
                            <h4> Please fill this form before you proceed to donate in educational feilds. </h4> 
                            <p>
                                We welcome voluntory non remunerated donors.
                            </p>
                        </CCol>
                    </CRow>
                </Paper>   
                <Paper className = "p-4 my-2">
                    <h4> You can contribute in this division by donating educational stuff for the needies. </h4 >
                    <h5> Following things can be provided. </h5>
                    <ul>
                        <li> Excercise Books </li>
                        <li> Shoes </li>
                        <li> Uniforms </li>
                        <li> Stationaries </li>
                        <li> etc... </li>
                    </ul>

                    <br/>
                    <CLabel className = "mx-4"> 1. Explained Description. </CLabel>
                    <CTextarea type = "number" style = {{maxWidth: 800}} rows = "10"/>

                    <CLabel className = "mx-3 px-4">
                        <Checkbox  
                            checked={true}
                            onChange={()=>""}
                            color="primary"
                        />
                        I agree to donate my organs according to the information given above.
                    </CLabel>
                    <CLabel className = "mx-3 px-4">
                        <Checkbox   
                            checked={true}
                            onChange={()=>""}
                            color="primary"
                        />
                        I like to show my identity in the system and posts regarding organ donation
                    </CLabel>

                    <br />
                    <br />
                    <br />
                    <p align = "right" >
                        <Button color = "secondary" variant = "outlined" className = "mx-3" onClick = {()=>props.history.push('/services/donate')}> Reset and go back </Button>
                        <Button color = "primary" variant = "contained"> Post Educational Fund </Button>
                    </p>

                    <br />
                    <br />
                    <br />
                    <br />
                </Paper>
            </Fade>
        </div>
    )
}

export default DonateStudentFund;
