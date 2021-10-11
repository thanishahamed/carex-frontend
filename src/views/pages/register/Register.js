import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow
} from '@coreui/react'
import {Zoom, Slide, Fade} from 'react-reveal';
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { Button, Grid, Select, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ContactMail, DialerSipSharp, Email, Event, Label, LayersRounded, MobileFriendly, PermIdentity, PersonOutline, SecurityOutlined, SecurityTwoTone, Wc } from '@material-ui/icons';
import image from './components/front.svg';
import SnackBar from 'src/views/alertComponents/SnackBar';
import RegistrationSuccess from './components/RegistrationSuccess';
import RegisterForm from './RegisterForm';
import Authenticate from 'src/Authenticate';

const styles = {
  mainStyle: {
    background: "url('"+image + "')",
    // background: "url('https://www.silverlineschool.com/wp-content/uploads/2016/11/sayagata-400px.png'),"
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '20% 20%'
  }
}

const Register = (props) => {

  const [firstName, setFirstName] = useState('Thanish');
  const [lastName, setLastName] = useState('Ahamed');
  const [address, setAddress] = useState('Warakapola');
  const [email, setEmail] = useState('muktharthanish@gmail.com');
  const [mobile, setMobile] = useState('94777277234');
  const [dob, setDob] = useState('2000-05-24');
  const [gender, setGender] = useState('Male');
  const [nic, setNic] = useState('991382216V');
  const [password, setPassword] = useState('12345678');
  const [passwordConfirmation, setPasswordConfirmation] = useState('12345678');
  const [registering, setRegistering] = useState(false);
  const [variant, setVariant] = useState('success');
  const [message, setMessage] = useState('Fill this form to register');
  const [fired, setFired] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [nicError, setNicError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const register = async (event) => {
    event.preventDefault();
      setRegistering(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/register`, { 
          firstName: firstName,
          lastName: lastName,
          address: address, 
          email:  email,
          mobile: mobile,
          dob: dob,
          gender: gender,
          nic: nic,
          password:password,
          password_confirmation: passwordConfirmation,
          role: 'subscriber'
        });

        Authenticate.setCookie('token', 'Bearer '+response.data.token, 1)
        Authenticate.setCookie('destroy_token', 'Bearer '+response.data.token, 1000);
        
        sendEmail(response.data.user.email, 'REGISTRATION SUCCESSFULL', lastName, "Thank you for registering to Care-x Social service community. Please click this link to verify your email. Thank You!", response.data.user.id);
        setRegistering(false);
        setRegisterSuccess(true);

      }catch(error) {
        let message;
        const e = error.response.data; 
        console.log(error.response)
        {
        // console.log(e.message);
        // console.log(error.response);

        // message = e.errors.nic ? e.errors.nic[0] : message;
        // message = e.errors.gender ? e.errors.gender[0] : message;
        // message = e.errors.dob ? e.errors.dob[0] : message;
        // message = e.errors.telephone ? e.errors.telephone[0] : message;
        // message = e.errors.password ? e.errors.password[0] : message;
        // message = e.errors.email ? e.errors.email[0] : message;
        // message = e.errors.address ? e.errors.address[0] : message;
        // message = e.errors.lastName ? e.errors.lastName[0] : message;
        // message = e.errors.firstName ? e.errors.firstName[0] : message;
        }

        if(e.errors.nic) { message = e.errors.nic[0]; setNicError(true); } else { message = message; setNicError(false) }
        if(e.errors.gender) { message = e.errors.gender[0]; setGenderError(true); } else { message = message; setGenderError(false) }
        if(e.errors.dob) { message = e.errors.dob[0]; setDobError(true); } else { message = message; setDobError(false) }
        if(e.errors.mobile) { message = e.errors.mobile[0]; setMobileError(true); } else { message = message; setMobileError(false) }
        if(e.errors.password) { message = e.errors.password[0]; setPasswordError(true); } else { message = message; setPasswordError(false) }
        if(e.errors.email) { message = e.errors.email[0]; setEmailError(true); } else { message = message; setEmailError(false) }
        if(e.errors.address) { message = e.errors.address[0]; setAddressError(true); } else { message = message; setAddressError(false) }
        if(e.errors.lastName) { message = e.errors.lastName[0]; setLastNameError(true); } else { message = message; setLastNameError(false); }
        if(e.errors.firstName) { message = e.errors.firstName[0]; setFirstNameError(true); } else { message = message; setFirstNameError(false); }

        setMessage(message);
        setVariant('error');
        setFired(f=>!f);
        setRegistering(false);

      }
  }

  const sendEmail = async (email, title, name, body, id ) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/send-email-verification`, {
        title: title,
        body: body,
        name: name,
        id: id,
        email: email
      }, Authenticate.header());
      console.log(response.data);
    }
    catch(e) {
      console.log(e.response)
    }
  }

  return (
    <Fade>
    <div className="c-app c-default-layout flex-row align-items-center" style = {styles.mainStyle}>
      
      <CContainer>

      <Fade>
        <CRow className="justify-content-center" >
          <CCol md="9" lg="7" xl="6">
            <RegisterForm 
              addUserMethod = {"register"}
            />
          </CCol>
        </CRow>
      </Fade>
      
      </CContainer>
    </div>
    </Fade>
  )
}

export default Register
