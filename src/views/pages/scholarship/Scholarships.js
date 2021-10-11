import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CInput, CLabel, CTextarea } from '@coreui/react';
import { Button, Checkbox, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';
import React from 'react';
import { Slide, Fade } from 'react-reveal';

export default function Scholarships() {
    return (
        <Fade>
            <Paper className = "p-4 my-2" >
                <h1> Fill the following form to add a scholarship </h1> 
                <p>
                    We welcome voluntory non remunerated donors.
                </p>
            </Paper>
            <Fade delay = {200}>
                <Paper className = "p-4">
                    <CLabel> 1. Target (eg: Degree Programe) </CLabel>
                    <br />
                    <small className = "mx-3"> Select about to whom this scholarship is offered! (Who can apply for the scholarship)</small>
                    <Select
                        labelId="target-desc"
                        id="target-desc"
                        // value={age}
                        // onChange={handleChange}
                        label="Age"
                        fullWidth
                        className = "mx-3"
                    >
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value={"GCE O/L"}>GCE O/L</MenuItem>
                        <MenuItem value={"GCE A/L"}>GCE A/L</MenuItem>
                        <MenuItem value={"Higher Studies"}>Higher Studies</MenuItem>
                        <MenuItem value={"Open Scholarship"}>Open Scholarship</MenuItem>
                    </Select>
                    <br />
                    <br />
                    <CLabel> 2. Number of Scholarships provided </CLabel>
                    <CInput type = "number" style = {{maxWidth: 100}} className = "mx-3"/>

                    <br />
                    <CLabel> 3. Total worth of the scholarship (LKR) <small>eg: 100,000</small> </CLabel>
                    <CInput type = "number" style = {{maxWidth: 300}} className = "mx-3"/>

                    <br />
                    <CLabel> 4. Detailed Description About The Scholarship (Mention all instructions to get the scholarship clearly.) </CLabel>
                    <CTextarea type = "number" className = "mx-3" rows = {10}/>

                    <br />
                    <CLabel className = "mx-3">
                        <Checkbox
                            checked={true}
                            onChange={()=>""}
                            color="primary"
                        />
                        I accept the terms and regulations provided by this site.
                    </CLabel>

                    <br />
                    <CLabel className = "mx-3">
                        <Checkbox
                            checked={true}
                            onChange={()=>""}
                            color="primary"
                        />
                        Hide my identity in when the fund message is posted (display as anonymous).
                    </CLabel>

                    <br />
                    <br />
                    <p align = "right">
                        <Button color = "secondary" variant = "outlined" className = "mx-3"> Reset </Button>
                        <Button color = "primary" variant = "contained"> ADD </Button>
                    </p>

                    <br />
                    <br />
                    <br />
                    <br />
                </Paper>
            </Fade>
        </Fade>
    )
}
