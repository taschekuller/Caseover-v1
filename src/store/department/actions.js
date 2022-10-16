import { 
    GET_DEPARTMENTS, 
    GET_DEPARTMENTS_SUCCESS, 
    GET_DEPARTMENTS_FAIL,
    GET_DEPARTMENT_DETAIL,
    GET_DEPARTMENT_DETAIL_SUCCESS,
    GET_DEPARTMENT_DETAIL_FAIL,
    ADD_DEPARTMENT,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAIL,
    DELETE_DEPARTMENT,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAIL
} from "./actionTypes"

export const getDepartments = () =>({
    type:GET_DEPARTMENTS,
})
export const getDepartmentsSuccess = (departments) =>({
    type:GET_DEPARTMENTS_SUCCESS,
    payload:departments
})
export const getDepartmentsFail = (error) =>({
    type:GET_DEPARTMENTS_FAIL,
    payload:error
})

export const getDepartmentDetail = (id) =>({
    type:GET_DEPARTMENT_DETAIL,
    payload:id
})
export const getDepartmentDetailFail = (error)=>({
    type:GET_DEPARTMENT_DETAIL_SUCCESS,
    payload:error
})
export const getDepartmentDetailSuccess = (department)=>({
    type:GET_DEPARTMENT_DETAIL_FAIL,
    payload:department
})

export const addDepartment = (department)=>({
    type:ADD_DEPARTMENT,
    payload:department
})
export const addDepartmentFail = (error) =>({
    type:ADD_DEPARTMENT_FAIL,
    payload:error
})
export const addDepartmentSuccess = (data) =>({
    type: ADD_DEPARTMENT_SUCCESS,
    payload:data
})

export const updateDepartment = (department) =>({
    type:UPDATE_DEPARTMENT,
    payload:department
})
export const updateDepartmentFail = (error) =>({
    type:UPDATE_DEPARTMENT_FAIL,
    payload:error
})
export const updateDepartmentSuccess = (data) =>({
    type:UPDATE_DEPARTMENT_SUCCESS,
    payload:data
})

export const deleteDepartment = (id) =>({
    type:DELETE_DEPARTMENT,
    payload: id
})
export const deleteDepartmentFail = (error) =>({
    type:DELETE_DEPARTMENT_FAIL,
    payload:error
})
export const deleteDepartmentSuccess = (data) =>({
    type:DELETE_DEPARTMENT_SUCCESS,
    payload:data
})