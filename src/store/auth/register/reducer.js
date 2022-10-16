import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  REGISTER_SUCCESS_RESET,
} from "./actionTypes"

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  registerSuccess: false,
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
        registerSuccess: true,
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }
      break
    case REGISTER_SUCCESS_RESET:
      state = {
        ...state,
        registerSuccess: false,
        registrationError:false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account
