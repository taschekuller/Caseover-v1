import {
  EMAIL_CONFIRM,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAIL,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_FAIL,
} from "./actionTypes"

const initialState = {
  loading: true,
  data: null,
  error: null,
  passwordConfirm:false
}

const ConfirmReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM_PASSWORD_SUCCESS:
            return {
                ...state,
                passwordConfirm:true,
               
            } 
    case EMAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        loading:false,
        data: action.payload.data,
      }
    case EMAIL_CONFIRM_FAIL:
    case CONFIRM_PASSWORD_FAIL:
      return {
        ...state,
        loading:false,
        error: action.payload,
       
      }
    default:
      return state
  }
}

export default ConfirmReducer
