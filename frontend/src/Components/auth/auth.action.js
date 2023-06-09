import { AUTH_POSTDATA, AUTH_SUCCESS } from "./auth.type";
import axios from "axios";

export const Logins = (data) => async (dispatch) => {
  console.log("action:", data);

  try {
    let response = await axios.post(
      "http://localhost:8080/company/signin",
      data
    );

    // console.log(response);
    dispatch({ type: AUTH_SUCCESS, payload: response.data.token });
  } catch (err) {
    console.log(err);
  }
};

export const SignUp = (data) => async (dispatch) => {
  // console.log(data);
  try {
    let response = await axios.post(
      "http://localhost:8080/company/signup",
      data
    );

    console.log(response);
    // dispatch({ type: AUTH_POSTDATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const EditUserQuery = (data) => async (dispatch) => {
  console.log(data);

  try {
    let response = await axios.patch(
      `http://localhost:8080/company/profile/${data._id}`,
      data
    );

    console.log(response);
    // dispatch({ type: AUTH_POSTDATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};


export const DeleteUser = (id) => async (dispatch) => {
  try {
     await axios.delete(
      `http://localhost:8080/company/profile/${id}`,
    );

    // dispatch({ type: AUTH_POSTDATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};