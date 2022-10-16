import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ConfirmReducer from "./auth/confirm/reducer"
import userForgetPassword from "./auth/forgetpwd/reducer"
import changePassword from "./auth/changePassword/reducer"
import Profile from "./auth/profile/reducer"

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Companies
import Companies from "./companies/reducer";


//Users
import Users from "./users/reducer"

//Department
import Departments from "./department/reducer"

//School
import Schools from "./school/reducer"


const rootReducer = combineReducers({
  Layout,
  Login,
  Account,
  userForgetPassword,
  changePassword,
  ConfirmReducer,
  Profile,
  Dashboard,
  Companies,

  Users,

  Departments,
  Schools

})

export default rootReducer
