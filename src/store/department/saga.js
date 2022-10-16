import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_DEPARTMENTS, DELETE_DEPARTMENT, ADD_DEPARTMENT, UPDATE_DEPARTMENT,GET_DEPARTMENT_DETAIL} from "./actionTypes";
import {
    getDepartmentsSuccess, getDepartmentsFail,
    getDepartmentDetailSuccess, getDepartmentDetailFail,
    addDepartmentSuccess, addDepartmentFail,
    updateDepartmentSuccess, updateDepartmentFail,
    deleteDepartmentSuccess, deleteDepartmentFail,
   
 } from "./actions";

//Include Both Helper File with needed methods
import {
    getDepartments, //API CONNECTION
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
}
    from "../../helpers/fakebackend_helper"; 


function* fetchDepartments() {
    try {
        const response = yield call(getDepartments)
        yield put(getDepartmentsSuccess(response));
    } catch (error) {
        yield put(getDepartmentsFail(error));
    }
}

function* fetchDepartmentById() {
    try {
        const response = yield call(getDepartmentById)
        yield put(getDepartmentDetailSuccess(response));
    } catch (error) {
        yield put(getDepartmentDetailFail(error));
    }
}

function* onDeleteDepartment({payload:id}){
    try{
        const response = yield call(deleteDepartment, id)
        yield put(deleteDepartmentSuccess(response));
    } catch (error) {
        yield put(deleteDepartmentFail(error));
    }
}

function* onAddDepartment({payload:department}){
    try{
        const response = yield call(addDepartment, department)
        yield put(addDepartmentSuccess(response));
    } catch (error) {
        yield put(addDepartmentFail(error));
    }
}

function* onUpdateDepartment({payload:department}){
    try{
        const response = yield call(updateDepartment, department)
        yield put(updateDepartmentSuccess(response));
    } catch (error) {
        yield put(updateDepartmentFail(error));
    }
}

export function* brandsSaga() {
    yield takeEvery(GET_DEPARTMENTS, fetchDepartments);
    yield takeEvery(DELETE_DEPARTMENT, onDeleteDepartment);
    yield takeEvery(ADD_DEPARTMENT, onAddDepartment);
    yield takeEvery(UPDATE_DEPARTMENT, onUpdateDepartment);
    yield takeEvery(GET_DEPARTMENT_DETAIL, fetchDepartmentById);
   
    
}

export default brandsSaga;
