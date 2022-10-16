import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  FORGOT_SEND_MAIL,
  FORGOT_SEND_MAIL_SUCCESS,
  FORGOT_SEND_MAIL_ERROR,
  FORGET_PASSWORD_RESET

} from "./actionTypes"

export const forgetPasswordReset = () => {
  return {
    type: FORGET_PASSWORD_RESET,
    payload: {},   
  }
}
export const userForgetPassword = (email) => {
  return {
    type: FORGET_PASSWORD,
    payload: email,
  }
}

export const userForgetPasswordSuccess = (data) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: data,
  }
}

export const userForgetPasswordError = (message) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  }}
 
