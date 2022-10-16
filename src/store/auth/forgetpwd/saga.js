import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions"
 
import { 
  forgotSendMail
} from "../../../helpers/fakebackend_helper"
 
 

function* userForgotPassword({payload:email}){
  try{
     
      const response = yield call(forgotSendMail, email);
      yield put(userForgetPasswordSuccess(response));
  } catch (error) {
      yield put(userForgetPasswordError(error));
  }
}
 

function* forgetPasswordSaga() { 
  yield takeEvery(FORGET_PASSWORD, userForgotPassword);
}

export default forgetPasswordSaga
