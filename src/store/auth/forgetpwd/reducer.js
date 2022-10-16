import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR, 
  FORGET_PASSWORD_RESET
} from "./actionTypes"

const initialState = {  
  data: null,
  error: null, 
}

const userForgetPassword = (state = initialState, action) => {
  switch (action.type) { 
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        error:null,
        data: action.payload,
      }  
    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        data: null,
        error: action.payload,
      }
      case FORGET_PASSWORD_RESET:
        state = {
          ...state,
          data: null,
          error: null, 
        }
    default:
      state = { ...state }
      break;
  }
  return state
}

export default userForgetPassword
