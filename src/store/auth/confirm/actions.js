import {
  EMAIL_CONFIRM,
  EMAIL_CONFIRM_SUCCESS, 
  EMAIL_CONFIRM_FAIL,
  CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_FAIL,
} from "./actionTypes"

export const ConfirmPassword = (password) => {
  return {
    type: CONFIRM_PASSWORD, 
    payload:  password ,
  }
}

export const ConfirmPasswordSuccess = user => {
  return {
    type: CONFIRM_PASSWORD_SUCCESS,
    payload: user,
  }
}
 

export const ConfirmPasswordFail = error => { 
  return {
    type: CONFIRM_PASSWORD_FAIL,
    payload: error,
  }
}

export const emailConfirm = (id, hash) => {
  return {
    type: EMAIL_CONFIRM,
    payload: { id, hash },
  }
}

export const emailConfirmSuccess = user => {
  return {
    type: EMAIL_CONFIRM_SUCCESS,
    payload: user,
  }
}
 

export const emailConfirmFail = error => {
  return {
    type: EMAIL_CONFIRM_FAIL,
    payload: error,
  }
}

 
