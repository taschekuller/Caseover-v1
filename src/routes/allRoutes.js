import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Profile/profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Confirm from "../pages/Authentication/Confirm"
import ConfirmAndPassword from "../pages/Authentication/ConfirmAndPassword"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import ResetPassword from "../pages/Authentication/ResetPassword"
// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Companies from "../pages/Companies/list" 
import CompanyUsers from "../pages/Companies/users"

import Users from "../pages/Users/list"

import Departments from "../pages/Departments/list"
import Schools from "pages/Schools/list"


const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // profile
  { path: "/profile/:id", component: UserProfile },
   
   // company
   { path: "/companies", component: Companies },
   { path: "/companies/users/:id", component: CompanyUsers },


   // Users
   { path: "/users", component: Users },
  

   {path:"/departments", component:Departments},
   {path:"/schools", component:Schools},


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/login/:ref", component: Login }, 
  { path: "/confirm/:id/:hash", component: Confirm },
  { path: "/confirmPassword/:id/:hash", component: ConfirmAndPassword },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/changePassword/:id/:hash", component: ResetPassword },
]

export { userRoutes, authRoutes }
