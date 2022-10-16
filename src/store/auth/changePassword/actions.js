import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "./actionTypes"


export const changePassword = (password) => ({
  type:  CHANGE_PASSWORD,
  payload: password
});

export const changePasswordSuccess = (data) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: data
});

export const changePasswordFail = (error) => ({
  type: CHANGE_PASSWORD_FAIL,
  payload: error,
});