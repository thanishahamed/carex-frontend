import React from 'react';
import { useHistory, useParams } from 'react-router';
import InternalPostView from '../postView/components/InternalPostView';
import TheLandingPageHeader from '../../../containers/TheLandingPageHeader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

export default function LoggedOutPostView() {
    const { id } = useParams();
    const history = useHistory();
    return (
        <div>
            <TheLandingPageHeader />
            <div style = {{paddingTop: 80}}>
                <div style = {{display: 'flex', justifyContent: 'space-around'}}>
                    <Button onClick = {()=>history.push('/care-x/services')}> <ArrowBackIcon /> Care-X services </Button>
                        <IconButton onClick = {()=>history.push('/')}> <HomeIcon /> </IconButton> 
                    <Button onClick = {()=>history.push('/community/services')}> Community services <ArrowForwardIcon />  </Button>
                </div>
                <InternalPostView />      
            </div>
        </div>
    )
}
