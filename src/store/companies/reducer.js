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

  GET_COMPANY_USERS_SUCCESS,
  GET_COMPANY_USERS_FAIL,
  ADD_COMPANY_USER_SUCCESS,
  ADD_COMPANY_USER_FAIL,
  DELETE_COMPANY_USER_SUCCESS,
  DELETE_COMPANY_USER_FAIL,
  UPDATE_COMPANY_USER_SUCCESS,
  UPDATE_COMPANY_USER_FAIL,
  GET_USER_ROLES_SUCCESS,
  GET_USER_ROLES_FAIL,
  ADD_USER_ROLES_SUCCESS,
  ADD_USER_ROLES_FAIL,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
  LOADING_ROLE,
  COMPANY_SUCCESS_STATUS,
} from "./actionTypes"

const INIT_STATE = {
  data: [],
  error: null,
  Roles: [],
  Users: [],
 
  UserRoles: [],
  loadingRole: false,
  successStatus: false,
  registerCompanySuccess: false,
}

const Companies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      }
    case GET_COMPANY_USERS_SUCCESS:
      return {
        ...state,
        Users: action.payload.data,
      }
    
    case ADD_COMPANY_USER_SUCCESS:
      return {
        ...state,
        loadingRole: false,
        successStatus: true,
        Users: [action.payload.data, ...state.Users],
      }
    case DELETE_COMPANY_USER_SUCCESS:
      return {
        ...state,
        loadingRole: false,
        successStatus: true,
        data: state.Users.filter(
          user => user._id.toString() !== action.payload.data.toString()
        ),
      }
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        Roles: action.payload.data,
      }
    case GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        UserRoles: action.payload.data,
        loadingRole: false,
      }
    case ADD_USER_ROLES_SUCCESS:
      return {
        ...state,
        UserRoles: action.payload.data,
        loadingRole: false,
        successStatus: true,
      }
      case UPDATE_COMPANY_USER_SUCCESS:
        return {
          ...state,
          loadingRole: false,
          successStatus: true,
          Users: state.Users.map(user =>
            user._id.toString() === action.payload.data._id.toString()
              ? { user, ...action.payload.Users }
              : user
          ),
        }
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        data: state.data.filter(
          company => company._id.toString() !== action.payload.data.toString()
        ),
      }
    case ADD_COMPANY_SUCCESS: 
      return {
        ...state,
        data: [action.payload.data, ...state.data],
        registerCompanySuccess: true,
      }
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        data: state.data.map(companyId =>
          companyId._id.toString() === action.payload.data._id.toString()
            ? { companyId, ...action.payload.data }
            : companyId
        ),
      }

    //FAILS
    case GET_COMPANIES_FAIL:
    case DELETE_COMPANY_FAIL:
    case ADD_COMPANY_FAIL:
    case UPDATE_COMPANY_FAIL:

    case GET_COMPANY_USERS_FAIL:
    case ADD_COMPANY_USER_FAIL:
    case UPDATE_COMPANY_USER_FAIL:
    case DELETE_COMPANY_USER_FAIL:
    case UPDATE_COMPANY_USER_FAIL:
    case GET_USER_ROLES_FAIL:
    case ADD_USER_ROLES_FAIL:
    case GET_ROLES_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingRole: false,
        UserRoles: [],
        Roles: [],
        successStatus: false,
      }
    case LOADING_ROLE:
      return {
        ...state,
        loadingRole: action.payload,
      }
    case COMPANY_SUCCESS_STATUS:
      return {
        ...state,
        successStatus: action.payload,
      }
    case RESET_COMPANY:
      return {
        ...state,
        registerCompanySuccess: false,
        error: null,
        Users: [],
        UserRoles: [],
        Roles: [],
        loadingRole: false,
        successStatus: false,
      }
    default:
      return state
  }
}

export default Companies
