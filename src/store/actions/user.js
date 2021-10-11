import axios from "axios";
import Authenticate from "src/Authenticate";

export const GET_USER_INFO = "GET_USER_INFO";
export const LOAD = "LOAD";
export const TEST_LOADER = "TEST_LOADER";
export const USER_DATA_LOADING = "USER_DATA_LOADING";
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS";
export const USER_DATA_FAILED = "USER_DATA_FAILED";

export const storeUserInfo = () => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER}/verified-user`,
      {},
      Authenticate.header()
    )
    .then((response) => {
      console.log(response.data);
      return () => response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Authenticate.logout(() => {});
      } else {
        return () => {
          info: {
          }
        };
      }
    });

  // const result = await axios.post(`${process.env.REACT_APP_SERVER}/verified-user`, {}, Authenticate.header());
};

export const loadUserData = () => (dispatch) => {
  dispatch({ type: USER_DATA_LOADING });
  axios
    .post(
      `${process.env.REACT_APP_SERVER}/verified-user`,
      {},
      Authenticate.header()
    )
    .then((response) => {
      dispatch({ type: USER_DATA_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Authenticate.logout(() => {});
      } else {
        console.log(error.response.data);
      }
    });
};
