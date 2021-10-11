import axios from "axios";
import React, { useEffect, useState } from "react";
import InformerLogin from "./components/InformerLogin";
import LoggedInPage from "./components/LoggedInPage";

export default function InformerView() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const logout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER + "/login-informer", data)
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("id", response.data.user.id);
        sessionStorage.setItem("user_id", response.data.user.user_id);
        sessionStorage.setItem("name", response.data.user.full_name);
        sessionStorage.setItem("email", response.data.user.email);
        sessionStorage.setItem("address", response.data.user.address);
        sessionStorage.setItem("nic", response.data.user.nic);
        sessionStorage.setItem("telephone", response.data.user.telephone);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const textChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  return (
    <div>
      {loggedIn ? (
        <LoggedInPage logout={logout} />
      ) : (
        <InformerLogin
          login={login}
          textChange={textChange}
          email={data.email}
          password={data.password}
        />
      )}
    </div>
  );
}
