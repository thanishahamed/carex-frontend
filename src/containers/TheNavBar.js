import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import PanToolIcon from '@material-ui/icons/PanTool';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Auth from '../Authenticate';
import { Link, Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });

const TheNavBar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    const logout = () => {
        Auth.logout(()=>console.log('logout successfull'));
    }

    return (
        <div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick = {() => history.push('/services') } />
                <BottomNavigationAction label="Donate" icon={ <FavoriteIcon />} onClick = {() => history.push('/services/donate') } />
                <BottomNavigationAction label="Scholarships" icon={<AccountBalanceWalletIcon />} onClick = {() => history.push('/services/scholarships') } />
                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} onClick = {() => history.push('/services/profile') } />
                <BottomNavigationAction className="d-none d-lg-block"label="Logout" icon={<ExitToAppIcon />} onClick = { logout }/>
            </BottomNavigation>
        </div>
    )
}

export default TheNavBar;