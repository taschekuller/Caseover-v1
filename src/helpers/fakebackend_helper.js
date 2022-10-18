import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session 
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

  
//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)
/*
// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}
*/
// Login Method
const postJwtLogin = data => post(url.POST_LOGIN, data)

export const postJwtRegister = data => post(url.POST_REGISTER, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)


// update user
// export const updateUser = user => put(url.UPDATE_USER, user)
//single update
export const updateUser = (planInput) => put(url.GET_USER + "/" + planInput?._id, planInput);

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)


export const forgotSendMail = (email) => post(url.FORGOT_SEND_MAIL, email);

export const postEmailConfirm = (id, hash) => post(url.EMAIL_CONFIRM, id, hash);
export const confirmPassword = (password) => post(url.CONFIRM_PASSWORD, password);


/* ####################################################################### */
/* COMPANIES*/

export const getCompanies = () => get(url.GET_COMPANIES);
export const delCompany = (id) => del(url.GET_COMPANIES + "/" + id); 
export const addCompany = (company) => post(url.GET_COMPANIES, company);
export const updateCompany = (company) => put(url.GET_COMPANIES + "/" + company?._id, company);

export const getCompanyUsers = (id) => get(url.GET_COMPANIES + "/users/" + id); 
export const addCompanyUser = (user) => post(url.GET_COMPANIES + "/user", user); 
export const updateCompanyUser = (user) => post(url.GET_COMPANIES + "/user-update", user); 
export const deleteCompanyUser = (id) => del(url.GET_COMPANIES + "/user/"+id); 



/* ####################################################################### */

//USER
export const updateUserCompany = (user) => put(url.GET_USER + "/addCompany/" + user?._id, user);
export const getUser = () => get(url.GET_USER);
export const delUser = (id) => del(url.GET_USER + "/" + id); 
export const addUser = (user) => post(url.GET_USER, user);



export const updateUsers = (user) => put(url.GET_USER + "/" + user?._id, user);
export const getCompanyByEmail = (email)=> get(url.GET_USER + "/getCompanyByEmail/" + email);
export const changePassword = (obj) => post(url.GET_USER + "/changePassword", obj); 
export const sendMail = (email) => post(url.SEND_MAIL, email);

export const getRoles = () => get(url.GET_ROLES); 
export const getUserRoles = (id) => get(url.GET_USER + "/roles/" + id);  
export const addUserRoles = (userRoles) => post(url.GET_ROLES + "/user", userRoles); 

/* ####################################################################### */

/* ####################################################################### */
/* DEPARTMENTS*/

export const getDepartments = () => get(url.GET_DEPARTMENT);
export const deleteDepartment = (id) => del(url.GET_DEPARTMENT + "/" + id); 
export const addDepartment = (planInput) => post(url.GET_DEPARTMENT, planInput);
export const updateDepartment = (planInput) => put(url.GET_DEPARTMENT + "/update/" + planInput?._id, planInput);  
export const getDepartmentById = (id) => get(url.GET_DEPARTMENT_BY_ID + "/" + id);  

/* ####################################################################### */ 
/* SCHOOLS */
export const getSchools = () => get(url.GET_SCHOOL);
export const deleteSchool = (id) => del(url.GET_SCHOOL + "/" + id); 
export const addSchool = (planInput) => post(url.GET_SCHOOL, planInput);
export const updateSchool = (planInput) => put(url.GET_SCHOOL + "/update/" + planInput?._id, planInput);  
export const getSchoolById = (id) => get(url.GET_SCHOOL_BY_ID + "/" + id);  



/* ####################################################################### */ 
export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd, 
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
}
