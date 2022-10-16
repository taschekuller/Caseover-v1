import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_USERS, DELETE_USER, ADD_USER, UPDATE_USER,GET_USERS_MY_USERS} from "./actionTypes";
import {
    getUsersSuccess, getUsersFail,
    deleteUserSuccess, deleteUserFail,
    updateUserSuccess, updateUserFail,
    addUserSuccess, addUserFail,
   
 } from "./actions";

//Include Both Helper File with needed methods
import {
    getUsers, //API CONNECTION
    delUser,
    addUser,
    updateUser,
    
}
    from "../../helpers/fakebackend_helper"; 


function* fetchUsers() {
    try {
        const response = yield call(getUsers)
        yield put(getUsersSuccess(response));
    } catch (error) {
        yield put(getUsersFail(error));
    }
}

function* onDeleteUsers({payload:id}){
    try{
        const response = yield call(delUser, id)
        yield put(deleteUserSuccess(response));
    } catch (error) {
        yield put(deleteUserFail(error));
    }
}

function* onAddUser({payload:user}){
    try{
        const response = yield call(addUser, user)
        yield put(addUserSuccess(response));
    } catch (error) {
        yield put(addUserFail(error));
    }
}

function* onUpdateUser({payload:user}){
    try{
        const response = yield call(updateUser, user)
        yield put(updateUserSuccess(response));
    } catch (error) {
        yield put(updateUserFail(error));
    }
}

export function* usersSaga() {
    yield takeEvery(GET_USERS, fetchUsers);
    yield takeEvery(DELETE_USER, onDeleteUsers);
    yield takeEvery(ADD_USER, onAddUser);
    yield takeEvery(UPDATE_USER, onUpdateUser);
   
    
}

export default usersSaga;
