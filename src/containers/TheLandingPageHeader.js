import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from '@coreui/react'
import logo from '../assets/pictures/logo-white-sm.png';
import logoSmall from '../assets/pictures/logo-icon-sm.png';
import { Slide } from 'react-reveal';
import Authenticate from 'src/Authenticate';
import { Button, Menu, MenuItem } from '@material-ui/core';

const TheLandingPageHeader = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    if(Authenticate.isAuthenticated()) {
      setLoggedIn(true);
    }
  },[]);
  
  return (
    <CHeader withSubheader colorScheme="dark" style={{backgroundColor: '#154360', borderBottom: '1px solid #5D6D7E'}}>
     
    <Slide left>
      <CHeaderBrand className="mx-auto d-lg-none px-3" to="/">
        <img src = {logo} width = { 100 }/>
      </CHeaderBrand>
    </Slide>
    
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <Slide left>
            <CHeaderBrand to="/">
              <img src = {logo} width = { 150 }/>
            </CHeaderBrand>
          </Slide>
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav className="px-3">
        {
          loggedIn ? 
          ''
          :
          <Slide right>
            <CHeaderNavItem className="px-3" >
                <CHeaderNavLink to="/register">Register</CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem  className="px-3">
              <CHeaderNavLink to="/login">Login</CHeaderNavLink>
            </CHeaderNavItem>
          </Slide>
        }
        
      </CHeaderNav>
    
    </CHeader>
    
  )
}

export default TheLandingPageHeader;
