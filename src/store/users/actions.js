import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    RESET_USER,
   
} from "./actionTypes";


export const resetUser = () => ({
    type: RESET_USER,
});

export const getUsers = () => ({
    type: GET_USERS,
});

export const getUsersSuccess = (user) => ({
    type: GET_USERS_SUCCESS,
    payload: user,
});


export const getUsersFail = (error) => ({
    type: GET_USERS_FAIL,
    payload: error,
});

export const deleteUser = (id) => ({
    type:  DELETE_USER,
    payload: id
});

export const deleteUserSuccess = (data) => ({
    type: DELETE_USER_SUCCESS,
    payload: data
});

export const deleteUserFail = (error) => ({
    type: DELETE_USER_FAIL,
    payload: error,
});


export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
});

export const addUserSuccess = (data) => ({
    type: ADD_USER_SUCCESS,
    payload: data
});

export const addUserFail = (error) => ({
    type: ADD_USER_FAIL,
    payload: error,
});


export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
});

export const updateUserSuccess = (data) => ({
    type: UPDATE_USER_SUCCESS,
    payload: data
});

export const updateUserFail = (error) => ({
    type: UPDATE_USER_FAIL,
    payload: error,
});