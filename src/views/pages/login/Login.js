import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Auth from "../../../Authenticate";
import { Zoom, Slide, Fade } from "react-reveal";
import axios from "axios";
import SnackBar from "src/views/alertComponents/SnackBar";

const styles = {
  mainStyle: {
    background:
      "url('https://www.silverlineschool.com/wp-content/uploads/2016/11/sayagata-400px.png')",
  },
};

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fired, setFired] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("Please login to continue!");

  useEffect(() => {
    if (Auth.isAuthenticated()) {
      props.history.push("/services");
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    Auth.login(email, password, (result, error) => {
      if (error) {
        setVariant("error");
        setMessage(result);
        setFired((f) => !f);
      } else {
        props.history.push("/services");
      }
    });
  };

  return (
    <div
      className="c-app c-default-layout flex-row align-items-center"
      style={styles.mainStyle}
    >
      <CContainer>
        <SnackBar fired={fired} variant={variant} message={message} />
        <Zoom>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={login}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            type="submit"
                            color="success"
                            className="px-4"
                            onClick={login}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>

                    <CButton
                      style={{ marginTop: 30 }}
                      color="dark"
                      className="px-4"
                      onClick={() => history.push("/login/informer")}
                    >
                      Login As Informer
                    </CButton>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-info py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>If you don't have an account. Please register</p>
                      <Link to="/register">
                        <CButton
                          color="success"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </Zoom>
      </CContainer>
    </div>
  );
};

export default Login;
