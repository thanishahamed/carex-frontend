import React from 'react';
import { CBadge, CCol, CInput, CLabel, CRow } from '@coreui/react';
import { Button, Checkbox, MenuItem, Paper, Select } from '@material-ui/core';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import { Fade } from 'react-reveal';
import { DropzoneArea } from 'material-ui-dropzone';
import './body.css';
import Confirm from 'src/views/alertComponents/Confirm';

const DonateBody = (props) => {
    return (
        <div>
            <Confirm
                show = {false}
            />
            <Fade> 
                <Paper className = "p-4 my-2" >
                    <CRow>
                        <CCol sm = "1">
                            <AirlineSeatFlatIcon style = {{fontSize: 70, color: '#0B9C65'}} />
                        </CCol>
                        <CCol>
                            <h4> Please fill this form before you proceed to donate your body after death. </h4> 
                            <p>
                                We welcome voluntory non remunerated donors.
                            </p>
                        </CCol>
                    </CRow>
                </Paper>    
                <Paper className = "p-3">
                    <h3> You can donate your body in two methods from our site! </h3>
                    <CBadge color = "primary"> Method 1 </CBadge>
                    <h5> Donate your body to a university after death (the recommended way to donate a body): </h5>
                    <ul>
                        <li> Colombo University: <a href = "https://med.cmb.ac.lk/anatomy/body-donation/"> Click here! </a> </li>
                        <li> Peradeniya University: <a href = "https://med.pdn.ac.lk/departments/anatomy/bodydonation.php"> Click here! </a> </li>
                        <li> Sri Jayawardanapura: <a href = "http://www.medical.sjp.ac.lk/downloads/body-donation-form/Body%20Donation%20Form%20-%20English.pdf"> Click here!</a></li>
                    </ul>
                    <p className = "p-3">
                        <Button color = "primary " variant = "contained"> Proceed with method 1 </Button>
                    </p>

                    <CBadge color = "primary"> Method 2 </CBadge>
                    <h5> Donate through Care-x: </h5>

                    <p className = "px-4">
                        Please download the following agreement form and fill all the fields.
                        <Button variant="contained" className = "mx-3" color = "danger"> Download </Button>
                    </p>

                    <p className = "px-4">
                        <strong> Take a photo of your hand filled agreement form and attach a certificate from the nearest hospital and upload. </strong>
                    </p>

                    <div className = "box-outlined">
                        <CRow>
                            <CCol sm="5">
                                <DropzoneArea
                                    onChange={(file)=>console.log(file)}
                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                    maxFileSize={5000000}
                                    filesLimit = {1}
                                    dropzoneText={"Agreement"}
                                />
                            </CCol>
                            <CCol sm="5">
                                <DropzoneArea
                                    onChange={(file)=>console.log(file)}
                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                    maxFileSize={5000000}
                                    filesLimit = {1}
                                    dropzoneText={"Hospital Certificate"}
                                />
                            </CCol>
                        </CRow>
                    </div>

                    <center>
                        <CBadge color = "success" className = "p-2 my-4"> Assign an informer: <br />(Truted person to inform availability) </CBadge>
                    </center>

                    <br/>
                    <CLabel className = "mx-4"> 1. Full Name of the informer. </CLabel>
                    <CInput type = "text" style = {{maxWidth: 500}} />

                    <br/>
                    <CLabel className = "mx-4"> 2. Address. </CLabel>
                    <CInput type = "text" style = {{maxWidth: 500}} />

                    <br/>
                    <CLabel className = "mx-4"> 3. NIC. </CLabel>
                    <CInput type = "text" style = {{maxWidth: 500}} />

                    <br />
                    <CLabel className = "mx-4"> 4. Gender </CLabel>
                    <Select
                        // value={age}
                        // onChange={handleChange}
                        label="Blood Group"
                        variant = "outlined"
                        className = "mx-3"
                    >
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>

                    <br/>
                    <br/>
                    <CLabel className = "mx-4"> 5. Telephone. </CLabel>
                    <CInput type = "number" style = {{maxWidth: 500}}/>

                    <br/>
                    <CLabel className = "mx-4"> 6. Date of Birth. </CLabel>
                    <CInput type = "date" style = {{maxWidth: 500}}/>

                    <br />
                    <p className = "mx-4 text-danger">
                        <strong> Note: </strong> <br />Informers will have the ablity to log into the account by giving the email and password given by you in here to update the availablity of the cadaver to the system.
                    </p>
                    <br/>
                    <CLabel className = "mx-4"> 7. Email. </CLabel>
                    <CInput type = "email" style = {{maxWidth: 400}} />

                    <br />
                    <CLabel className = "mx-4"> 8. Password. </CLabel>
                    <CInput type = "password" style = {{maxWidth: 400}}/>

                    <br/>
                    <CLabel className = "mx-4"> 9. Re-Enter Password. </CLabel>
                    <CInput type = "password" style = {{maxWidth: 400}}/>

                    <CLabel className = "mx-3 px-4">
                        <Checkbox   
                            checked={true}
                            onChange={()=>""}
                            color="primary"
                        />
                        I trust this person. (you can delete, edit, or modify this person later)
                    </CLabel>
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


                    <p className = "box-outlined p-3">
                        <small>
                            <strong> Sources: </strong> <br />

                            <cite> https://slja.sljol.info/articles/10.4038/slja.v27i2.8446/galley/6370/download/ </cite>
                            <br /> <cite> https://slja.sljol.info/articles/abstract/10.4038/slja.v27i2.8446/ </cite>
                            <br /> <cite> https://www.government.nl/topics/organ-tissue-donation/question-and-answer/if-i-am-a-registered-donor-what-will-happen-to-my-body-after-my-death </cite>
                            <br /> <cite> https://www.government.nl/topics/organ-tissue-donation/question-and-answer/donate-organ-tissue-while-alive </cite>
                            <br /> <cite> https://slja.sljol.info/articles/10.4038/slja.v27i2.8446/galley/6370/download/ </cite>
                        </small>
                    </p>


                    <br />
                    <br />
                    <br />
                    <p align = "right" >
                        <Button color = "secondary" variant = "outlined" className = "mx-3" onClick = {()=>props.history.push('/services/donate')}> Reset and go back </Button>
                        <Button color = "primary" variant = "contained"> Proceed with method 2 </Button>
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

export default DonateBody;
