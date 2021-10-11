import { CCol, CLabel, CRow, CTextarea } from '@coreui/react';
import { Button, Checkbox, Paper } from '@material-ui/core';
import React from 'react'
import { Fade } from 'react-reveal';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const RequestService = (props) => {
    return (
        <div>
            <Fade>
                <Paper className = "p-4 my-2" >
                    <CRow>
                        <CCol sm = "1">
                            <PlaylistAddCheckIcon style = {{fontSize: 70, color: '#2874A6'}} />
                        </CCol>
                        <CCol>
                            <h4> We welcome to here from you! Please send us your requests </h4> 
                            <p>
                                voluntory non remunerated donors are mostly welcome.
                            </p>
                        </CCol>
                    </CRow>
                </Paper>   

                <Paper className = "p-4"> 
                    <br/>
                    <CLabel className = "mx-4"> 1. Explained Request Description. </CLabel>
                    <CTextarea type = "number" style = {{maxWidth: 800}} rows = "10"/>

                    <CLabel className = "mx-3 px-4">
                        <Checkbox  
                            checked={true}
                            onChange={()=>""}
                            color="primary"
                        />
                        I agree to donate my organs according to the information given above.
                    </CLabel>

                    <br />
                    <br />
                    <br />
                    <p align = "right" >
                        <Button color = "secondary" variant = "outlined" className = "mx-3" onClick = {()=>props.history.push('/services/donate')}> Reset and go back </Button>
                        <Button color = "primary" variant = "contained"> Post Request </Button>
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


export default RequestService;