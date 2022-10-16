import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  REGISTER_SUCCESS_RESET,
} from "./actionTypes"

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: {user}
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}

export const registerSuccessReset = () => {
  return {
    type: REGISTER_SUCCESS_RESET,
    payload: {}, 
  }
}

