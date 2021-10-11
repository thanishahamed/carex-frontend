import React, { useEffect } from 'react';
import { CContainer, CInput } from '@coreui/react';
import TheLandingPageHeader from 'src/containers/TheLandingPageHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Typography } from '@material-ui/core';
import { Fade } from 'react-reveal';
import { useHistory } from 'react-router';

export default function Feedbacks() {
    const history = useHistory();

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div>
            <TheLandingPageHeader />
            <div style ={{paddingTop: 100}}>
                <CContainer size="sm">
                    <Button variant = "outlined" color = "default" onClick = {()=>history.goBack()} > <ArrowBackIcon /> Back </Button>
                    <div style = {{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                        <Fade>
                            <Typography variant = "h2"> Say something you think about us! </Typography>
                        </Fade>
                    </div>
                </CContainer>
            </div>
        </div>
    )
}
