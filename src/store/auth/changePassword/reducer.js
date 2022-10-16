import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from "./actionTypes"

const initialState = {
  data: null,
  error: null,
  changePasswordSuccess:false
}

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        changePasswordSuccess:true
      }
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
      } 
      default:
        return state;
  } 
}

export default changePassword
