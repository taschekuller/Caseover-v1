import { 
    GET_SCHOOLS, 
    GET_SCHOOLS_SUCCESS, 
    GET_SCHOOLS_FAIL,
    GET_SCHOOL_DETAIL,
    GET_SCHOOL_DETAIL_SUCCESS,
    GET_SCHOOL_DETAIL_FAIL,
    ADD_SCHOOL,
    ADD_SCHOOL_SUCCESS,
    ADD_SCHOOL_FAIL,
    UPDATE_SCHOOL,
    UPDATE_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_FAIL,
    DELETE_SCHOOL,
    DELETE_SCHOOL_SUCCESS,
    DELETE_SCHOOL_FAIL
} from "./actionTypes"

export const getSchools = () =>({
    type:GET_SCHOOLS,
})
export const getSchoolsSuccess = (schools) =>({
    type:GET_SCHOOLS_SUCCESS,
    payload:schools
})
export const getSchoolsFail = (error) =>({
    type:GET_SCHOOLS_FAIL,
    payload:error
})

export const getSchoolDetail = (id) =>({
    type:GET_SCHOOL_DETAIL,
    payload:id
})
export const getSchoolDetailFail = (error)=>({
    type:GET_SCHOOL_DETAIL_SUCCESS,
    payload:error
})
export const getSchoolDetailSuccess = (school)=>({
    type:GET_SCHOOL_DETAIL_FAIL,
    payload:school
})

export const addSchool = (school)=>({
    type:ADD_SCHOOL,
    payload:school
})
export const addSchoolFail = (error) =>({
    type:ADD_SCHOOL_FAIL,
    payload:error
})
export const addSchoolSuccess = (data) =>({
    type: ADD_SCHOOL_SUCCESS,
    payload:data
})

export const updateSchool = (school) =>({
    type:UPDATE_SCHOOL,
    payload:school
})
export const updateSchoolFail = (error) =>({
    type:UPDATE_SCHOOL_FAIL,
    payload:error
})
export const updateSchoolSuccess = (data) =>({
    type:UPDATE_SCHOOL_SUCCESS,
    payload:data
})

export const deleteSchool = (id) =>({
    type:DELETE_SCHOOL,
    payload: id
})
export const deleteSchoolFail = (error) =>({
    type:DELETE_SCHOOL_FAIL,
    payload:error
})
export const deleteSchoolSuccess = (data) =>({
    type:DELETE_SCHOOL_SUCCESS,
    payload:data
})