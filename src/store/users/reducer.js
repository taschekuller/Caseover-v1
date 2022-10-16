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

const INIT_STATE = {
    data: [], 
    error: null,
   
};

const Users = (state = INIT_STATE, action) => {
    switch (action.type) {
     
        case GET_USERS_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                data: state.data.filter(user => user._id.toString() !== action.payload.data.toString())
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                data: [action.payload.data, ...state.data]
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                data: state.data.map(user =>
                    user._id.toString() === action.payload.data._id.toString() ?
                        { user, ...action.payload.data } :
                        user
                )
            }

        //FAILS
        case GET_USERS_FAIL:
        case DELETE_USER_FAIL:
        case ADD_USER_FAIL:
        case UPDATE_USER_FAIL:
     
            return {
                ...state,
                error: action.payload
            }

        case RESET_USER: return {
            ...state,
            error: null
        }
        default:
            return state;
    }
}


export default Users;