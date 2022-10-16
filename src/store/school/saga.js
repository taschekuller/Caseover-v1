import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_SCHOOLS, DELETE_SCHOOL, ADD_SCHOOL, UPDATE_SCHOOL,GET_SCHOOL_DETAIL} from "./actionTypes";
import {
    getSchoolsSuccess, getSchoolsFail,
    getSchoolDetailSuccess, getSchoolDetailFail,
    addSchoolSuccess, addSchoolFail,
    updateSchoolSuccess, updateSchoolFail,
    deleteSchoolSuccess, deleteSchoolFail,
   
 } from "./actions";

//Include Both Helper File with needed methods
import {
    getSchools, //API CONNECTION
    getSchoolById,
    addSchool,
    updateSchool,
    deleteSchool,
}
    from "../../helpers/fakebackend_helper"; 


function* fetchSchools() {
    try {
        const response = yield call(getSchools)
        yield put(getSchoolsSuccess(response));
    } catch (error) {
        yield put(getSchoolsFail(error));
    }
}

function* fetchSchoolById() {
    try {
        const response = yield call(getSchoolById)
        yield put(getSchoolDetailSuccess(response));
    } catch (error) {
        yield put(getSchoolDetailFail(error));
    }
}

function* onDeleteSchool({payload:id}){
    try{
        const response = yield call(deleteSchool, id)
        yield put(deleteSchoolSuccess(response));
    } catch (error) {
        yield put(deleteSchoolFail(error));
    }
}

function* onAddSchool({payload:School}){
    try{
        const response = yield call(addSchool, School)
        yield put(addSchoolSuccess(response));
    } catch (error) {
        yield put(addSchoolFail(error));
    }
}

function* onUpdateSchool({payload:School}){
    try{
        const response = yield call(updateSchool, School)
        yield put(updateSchoolSuccess(response));
    } catch (error) {
        yield put(updateSchoolFail(error));
    }
}

export function* brandsSaga() {
    yield takeEvery(GET_SCHOOLS, fetchSchools);
    yield takeEvery(DELETE_SCHOOL, onDeleteSchool);
    yield takeEvery(ADD_SCHOOL, onAddSchool);
    yield takeEvery(UPDATE_SCHOOL, onUpdateSchool);
    yield takeEvery(GET_SCHOOL_DETAIL, fetchSchoolById);
   
    
}

export default brandsSaga;
