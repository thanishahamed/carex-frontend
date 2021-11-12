import axios from "axios";
axios.defaults.headers.common["Authorization"] = getCookie("token");

class Auth {
  constructor() {
    if (this.getCookie("token")) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  login(email, password, cb) {
    let res = "";
    let err = null;
    let alldata = "";

    axios
      .post(`${process.env.REACT_APP_SERVER}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.message === "success") {
          this.authenticated = true;
          this.setCookie("token", "Bearer " + response.data.token, 1);
          this.setCookie(
            "destroy_token",
            "Bearer " + response.data.token,
            1000
          );
          res = response.data.message;
          err = null;
          cb(res, err);
        } else {
          this.authenticated = false;
          res = response.data.message;
          err = true;
          cb(res, err);
        }
      })
      .catch((error) => {
        this.authenticated = false;
        res = error.response.data.message;
        err = true;
        cb(res, err);
      });
  }

  logout(cb) {
    axios
      .post(`${process.env.REACT_APP_SERVER}/logout`, {}, this.destroy_header())
      .then((response) => {
        this.authenticated = false;
        this.setCookie("token", "", 0);
        this.setCookie("destroy_token", "", 0);
        window.location.replace("/");
        cb();
      })
      .catch((error) => {
        // console.log(error.response);
        this.authenticated = false;
        this.setCookie("token", "", 0);
        this.setCookie("destroy_token", "", 0);
      });
  }

  isAuthenticated() {
    if (this.getCookie("token")) {
      return true;
    } else {
      return false;
    }
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  header() {
    return {
      headers: {
        Authorization: getCookie("token"),
      },
    };
  }

  headerWithChatAdmin() {
    return {
      headers: {
        Authorization: getCookie("token"),
        "PRIVATE-KEY": process.env.REACT_APP_CHAT_PROJECT_PRIVATE_KEY,
      },
    };
  }

  destroy_header() {
    return {
      headers: {
        Authorization: getCookie("destroy_token"),
      },
    };
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export default new Auth();
