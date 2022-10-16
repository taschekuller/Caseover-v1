import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_COMPANIES,
  DELETE_COMPANY,
  ADD_COMPANY,
  UPDATE_COMPANY,
  GET_COMPANY_USERS,
  ADD_COMPANY_USER,
  DELETE_COMPANY_USER,
  UPDATE_COMPANY_USER,
  GET_ROLES,
  GET_USER_ROLES,
  ADD_USER_ROLES,

} from "./actionTypes"
import {
  getCompaniesSuccess,
  getCompaniesFail,
  deleteCompanySuccess,
  deleteCompanyFail,
  updateCompanySuccess,
  updateCompanyFail,
  addCompanySuccess,
  addCompanyFail,

  getCompanyUsersSuccess,
  getCompanyUsersFail,
  addCompanyUserSuccess,
  addCompanyUserFail,
  deleteCompanyUserSuccess,
  deleteCompanyUserFail,
  updateCompanyUserSuccess,
  updateCompanyUserFail,
  getRolesSuccess,
  getRolesFail,
  getUserRolesSuccess,
  getUserRolesFail,
  addUserRolesSuccess,
  addUserRolesFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCompanies, //API CONNECTION
  delCompany,
  addCompany,
  updateCompany,
  getCompanyUsers,
  addCompanyUser,
  deleteCompanyUser,
  updateCompanyUser,
  getRoles,
  getUserRoles,
  addUserRoles,

} from "../../helpers/fakebackend_helper"

function* fetchCompanies() {
  try {
    const response = yield call(getCompanies)
    // localStorage.setItem("companies", JSON.stringify(response))
    yield put(getCompaniesSuccess(response))
  } catch (error) {
    yield put(getCompaniesFail(error))
  }
}

function* onDeleteCompanies({ payload: id }) {
  try {
    const response = yield call(delCompany, id)
    yield put(deleteCompanySuccess(response))
  } catch (error) {
    yield put(deleteCompanyFail(error))
  }
}

function* onAddCompany({ payload: company }) {
  try {
    const response = yield call(addCompany, company)
    yield put(addCompanySuccess(response))
  } catch (error) {
    yield put(addCompanyFail(error))
  }
}

function* onUpdateCompany({ payload: companyId }) {
  try {
    const response = yield call(updateCompany, companyId)
    yield put(updateCompanySuccess(response))
  } catch (error) {
    yield put(updateCompanyFail(error))
  }
}

function* onGetCompanyUsers({ payload: id }) {
  try {
    const response = yield call(getCompanyUsers, id)
    yield put(getCompanyUsersSuccess(response))
  } catch (error) {
    yield put(getCompanyUsersFail(error))
  }
}


function* onGetRoles() {
  try {
    const response = yield call(getRoles)
    yield put(getRolesSuccess(response))
  } catch (error) {
    yield put(getRolesFail(error))
  }
}

function* onGetUserRoles({ payload: id }) {
  try {
    const response = yield call(getUserRoles, id)
    yield put(getUserRolesSuccess(response))
  } catch (error) {
    yield put(getUserRolesFail(error))
  }
}

function* onAddCompanyUser({ payload: user }) {
  try {
    const response = yield call(addCompanyUser, user)
    yield put(addCompanyUserSuccess(response))
  } catch (error) {
    yield put(addCompanyUserFail(error))
  }
}

function* onDeleteCompanyUser({ payload: id }) {
  try {
    const response = yield call(deleteCompanyUser, id)
    yield put(deleteCompanyUserSuccess(response))
  } catch (error) {
    yield put(deleteCompanyUserFail(error))
  }
}

function* onUpdateCompanyUser({ payload: user }) {
  try {
    const response = yield call(updateCompanyUser, user)
    yield put(updateCompanyUserSuccess(response))
  } catch (error) {
    yield put(updateCompanyUserFail(error))
  }
}

function* onAddUserRoles({ payload: userRoles }) {
    try {
      const response = yield call(addUserRoles, userRoles)
      yield put(addUserRolesSuccess(response))
    } catch (error) {
      yield put(addUserRolesFail(error))
    }
  }

export function* companiesSaga() {
  yield takeEvery(GET_COMPANIES, fetchCompanies)
  yield takeEvery(DELETE_COMPANY, onDeleteCompanies)
  yield takeEvery(ADD_COMPANY, onAddCompany)
  yield takeEvery(UPDATE_COMPANY, onUpdateCompany)
  yield takeEvery(GET_COMPANY_USERS, onGetCompanyUsers)

  yield takeEvery(ADD_COMPANY_USER, onAddCompanyUser)
  yield takeEvery(DELETE_COMPANY_USER, onDeleteCompanyUser)
  yield takeEvery(UPDATE_COMPANY_USER, onUpdateCompanyUser)
  yield takeEvery(GET_ROLES, onGetRoles)
  yield takeEvery(GET_USER_ROLES, onGetUserRoles) 
  yield takeEvery(ADD_USER_ROLES, onAddUserRoles) 
}

export default companiesSaga
