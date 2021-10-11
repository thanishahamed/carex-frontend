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
  
  const RegisterForm = (props) => {
  
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
  
          if(props.addUserMethod === "register") {
              Authenticate.setCookie('token', 'Bearer '+response.data.token, 1)
              Authenticate.setCookie('destroy_token', 'Bearer '+response.data.token, 1000);
          }
          
          sendEmail(response.data.user.email, 'REGISTRATION SUCCESSFULL', lastName, "Thank you for registering to Care-x Social service community. Please click this link to verify your email. Thank You!", response.data.user.id);
          setMessage("Registration Successful!");
          setVariant('success');
          setFired(f=>!f);

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
        <div>
            <RegistrationSuccess 
                registerSuccess = {registerSuccess}
                setRegisterSuccess = {setRegisterSuccess}
                addUserMethod = {props.addUserMethod}
            />
            <CCard className="mx-4" style = {{background: 'rgba(255,255,255,0.9)'}}>
              <CCardBody className="p-4" >
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  
                   <Grid container spacing={3} alignItems="flex-end">
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { firstNameError } label="First Name" fullWidth value = {firstName} onChange = {(e)=>setFirstName(e.target.value)} />
                      </Grid>

                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { lastNameError } label="Last Name" fullWidth value = {lastName} onChange = {(e)=>setLastName(e.target.value)}/>
                      </Grid>

                      <Grid item>
                        <ContactMail />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { addressError } label="Address" fullWidth value = {address} onChange = {(e)=>setAddress(e.target.value)}/>
                      </Grid>

                      <Grid item>
                        <Email />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { emailError } label="Email" fullWidth value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
                      </Grid>

                      <Grid item>
                        <SecurityTwoTone />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { passwordError } type = "password" label="Password" fullWidth value = {password} onChange = {(e)=>setPassword(e.target.value)}/>
                      </Grid>

                      <Grid item>
                        <SecurityOutlined />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { passwordError } type = "password" label="Confirm Password" fullWidth value = {passwordConfirmation} onChange = {(e)=>setPasswordConfirmation(e.target.value)}/>
                      </Grid>

                      <Grid item>
                        <MobileFriendly />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField error = { mobileError } label="Mobile (94777xxxxxxx)" type = "number" fullWidth value = {mobile} onChange = {(e)=>setMobile(e.target.value)}/>
                      </Grid>

                      <Grid item>
                        <Event />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="date"
                          label="Date of birth"
                          type="date"
                          error = { dobError }
                          value = {dob}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange = {(e)=>setDob(e.target.value)}
                        />
                      </Grid>

                      <Grid item>
                        <Wc />
                      </Grid>
                      <Grid item xs={10}>
                        <CLabel> Gender </CLabel>
                        <Select
                          native
                          error = { genderError }
                          value={gender}
                          onChange = {(e)=>setGender(e.target.value)}
                          inputProps={{
                            name: 'gender',
                            id: 'gender-native-simple',
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value={'Male'}>Male</option>
                          <option value={'Female'}>Female</option>
                        </Select>
                      </Grid>
                      
                      <Grid item>
                        <PermIdentity />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField label="NIC" error = { nicError } value = {nic} fullWidth onChange = {(e)=>setNic(e.target.value)}/>
                      </Grid>
                      
                  </Grid>
                  <br /> 
                  <Button variant = "contained" fullWidth color = "primary" onClick = {register} disabled = {registering}> Create Account </Button>
                  <br /><br />
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>

            <SnackBar 
                fired = {fired}
                variant = {variant}
                message = {message}
            />
        </div>
    )
}

export default RegisterForm;