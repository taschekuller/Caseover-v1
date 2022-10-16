import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga" 
import changePasswordSaga from "./auth/changePassword/saga" 
import ConfirmSaga from "./auth/confirm/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga" 
import dashboardSaga from "./dashboard/saga";
import companiesSaga from "./companies/saga";

import usersSaga from "./users/saga"

import departmentSaga from "./department/saga";
import schoolSaga from "./school/saga";


export default function* rootSaga() {
  yield all([
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(changePasswordSaga),
    fork(ConfirmSaga),
    fork(ProfileSaga),
    fork(LayoutSaga), 
    fork(dashboardSaga), 

    fork(companiesSaga),
    fork(usersSaga),

    fork(companiesSaga), 
    fork(departmentSaga),
    fork(schoolSaga),

  ])
}