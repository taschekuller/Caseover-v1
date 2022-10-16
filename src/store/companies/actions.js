import {
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAIL,
    GET_COMPANY_DETAIL,
    GET_COMPANY_DETAIL_SUCCESS,
    GET_COMPANY_DETAIL_FAIL,
    ADD_COMPANY,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAIL,
    UPDATE_COMPANY,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_FAIL,
    DELETE_COMPANY,
    DELETE_COMPANY_SUCCESS,
    DELETE_COMPANY_FAIL,
    RESET_COMPANY,
    GET_COMPANY_BRANCHES,
    GET_COMPANY_BRANCHES_SUCCESS,
    GET_COMPANY_BRANCHES_FAIL,
    GET_COMPANY_USERS,
    GET_COMPANY_USERS_SUCCESS,
    GET_COMPANY_USERS_FAIL,
    ADD_COMPANY_USER,
    ADD_COMPANY_USER_SUCCESS,
    ADD_COMPANY_USER_FAIL,
    UPDATE_COMPANY_USER,
    UPDATE_COMPANY_USER_SUCCESS,
    UPDATE_COMPANY_USER_FAIL,
    DELETE_COMPANY_USER,
    DELETE_COMPANY_USER_SUCCESS,
    DELETE_COMPANY_USER_FAIL,
    GET_ROLES,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAIL,
    GET_USER_ROLES,
    GET_USER_ROLES_SUCCESS,
    GET_USER_ROLES_FAIL,
    ADD_USER_ROLES,
    ADD_USER_ROLES_SUCCESS,
    ADD_USER_ROLES_FAIL,
    LOADING_ROLE,
    COMPANY_SUCCESS_STATUS
} from "./actionTypes";

export const resetCompany = () => ({
    type: RESET_COMPANY,
});

export const getCompanies = () => ({
    type: GET_COMPANIES,
});

export const getCompaniesSuccess = (companies) => ({
    type: GET_COMPANIES_SUCCESS,
    payload: companies,
});


export const getCompaniesFail = (error) => ({
    type: GET_COMPANIES_FAIL,
    payload: error,
});

export const deleteCompany = (id) => ({
    type:  DELETE_COMPANY,
    payload: id
});

export const deleteCompanySuccess = (data) => ({
    type: DELETE_COMPANY_SUCCESS,
    payload: data
});

export const deleteCompanyFail = (error) => ({
    type: DELETE_COMPANY_FAIL,
    payload: error,
});


export const addCompany = (company) => ({
    type: ADD_COMPANY,
    payload: company
});

export const addCompanySuccess = (data) => ({
    type: ADD_COMPANY_SUCCESS,
    payload: data
});

export const addCompanyFail = (error) => ({
    type: ADD_COMPANY_FAIL,
    payload: error,
});


export const updateCompany = (companyId) => ({
    type: UPDATE_COMPANY,
    payload: companyId
});

export const updateCompanySuccess = (data) => ({
    type: UPDATE_COMPANY_SUCCESS,
    payload: data
});

export const updateCompanyFail = (error) => ({
    type: UPDATE_COMPANY_FAIL,
    payload: error,
});

//----USERS
export const getCompanyUsers = (id) => ({
    type: GET_COMPANY_USERS,
    payload:id
});
export const getCompanyUsersSuccess = (data) => ({
    type: GET_COMPANY_USERS_SUCCESS,
    payload: data
});
export const getCompanyUsersFail = (error) => ({
    type: GET_COMPANY_USERS_FAIL,
    payload: error,
});

export const addCompanyUser = (id) => ({
    type: ADD_COMPANY_USER,
    payload:id
});
export const addCompanyUserSuccess = (data) => ({
    type: ADD_COMPANY_USER_SUCCESS,
    payload: data
});
export const addCompanyUserFail = (error) => ({
    type: ADD_COMPANY_USER_FAIL,
    payload: error,
});

export const deleteCompanyUser = (id) => ({
    type: DELETE_COMPANY_USER,
    payload:id
});
export const deleteCompanyUserSuccess = (data) => ({
    type: DELETE_COMPANY_USER_SUCCESS,
    payload: data
});
export const deleteCompanyUserFail = (error) => ({
    type: DELETE_COMPANY_USER_FAIL,
    payload: error,
});


export const updateCompanyUser = (user) => ({
    type: UPDATE_COMPANY_USER,
    payload:user
});
export const updateCompanyUserSuccess = (data) => ({
    type: UPDATE_COMPANY_USER_SUCCESS,
    payload: data
});
export const updateCompanyUserFail = (error) => ({
    type: UPDATE_COMPANY_USER_FAIL,
    payload: error,
});


//---
export const getRoles = () => ({
    type: GET_ROLES
});
export const getRolesSuccess = (data) => ({
    type: GET_ROLES_SUCCESS,
    payload: data
});
export const getRolesFail = (error) => ({
    type: GET_ROLES_FAIL,
    payload: error,
});

//---
export const getUserRoles = (id) => ({
    type: GET_USER_ROLES,
    payload:id
});
export const getUserRolesSuccess = (data) => ({
    type: GET_USER_ROLES_SUCCESS,
    payload: data
});
export const getUserRolesFail = (error) => ({
    type: GET_USER_ROLES_FAIL,
    payload: error,
});

//---

export const addUserRoles = (id) => ({
    type: ADD_USER_ROLES,
    payload:id
});
export const addUserRolesSuccess = (data) => ({
    type: ADD_USER_ROLES_SUCCESS,
    payload: data
});
export const addUserRolesFail = (error) => ({
    type: ADD_USER_ROLES_FAIL,
    payload: error,
});

export const setLoadingRole = (status) =>({
    type: LOADING_ROLE, 
    payload:status
});


export const setCompanySuccessStatus = (status) =>({
    type: COMPANY_SUCCESS_STATUS, 
    payload:status
});
