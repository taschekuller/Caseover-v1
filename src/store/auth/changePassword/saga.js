import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { CHANGE_PASSWORD } from "./actionTypes"
import {  changePasswordSuccess,changePasswordFail } from "./actions"
 
import {
  changePassword
} from "../../../helpers/fakebackend_helper"
 
function* onChangePassword({payload:password}){
  try{
      const response = yield call(changePassword, password)
      yield put(changePasswordSuccess(response));
  } catch (error) {
      yield put(changePasswordFail(error));
  }
}

function* changePasswordSaga() {
  yield takeEvery(CHANGE_PASSWORD, onChangePassword);
}

export default changePasswordSaga
