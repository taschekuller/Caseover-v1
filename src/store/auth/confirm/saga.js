import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import {
  EMAIL_CONFIRM,
  CONFIRM_PASSWORD
} from "./actionTypes"

import { emailConfirmSuccess, emailConfirmFail,
  ConfirmPasswordSuccess,ConfirmPasswordFail
} from "./actions"

//Include Both Helper File with needed methods
import {
  postEmailConfirm,confirmPassword
} from "../../../helpers/fakebackend_helper"

function* emailConfirm({payload:id, payload:hash}) {
  try {
      const response = yield call(postEmailConfirm, id, hash)
      yield put(emailConfirmSuccess(response));
  } catch (error) {
      yield put(emailConfirmFail(error));
  }
}
function* confirmAndPassword({payload:password}) {
  try {
      const response = yield call(confirmPassword, password)
      yield put(ConfirmPasswordSuccess(response));
  } catch (error) {
      yield put(ConfirmPasswordFail(error));
  }
}

function* confirmSaga() {
  yield takeEvery(EMAIL_CONFIRM, emailConfirm)
  yield takeEvery(CONFIRM_PASSWORD, confirmAndPassword) 
}

export default confirmSaga
