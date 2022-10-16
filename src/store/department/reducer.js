import { 
    GET_DEPARTMENTS_SUCCESS, 
    GET_DEPARTMENTS_FAIL,
    GET_DEPARTMENT_DETAIL_SUCCESS,
    GET_DEPARTMENT_DETAIL_FAIL,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAIL,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAIL
} from "./actionTypes"

const INIT_STATE = {
    data: [], 
    error: null,
   
};

const Departments = (state = INIT_STATE, action) => {
    switch (action.type) {
     
        case GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                data: state.data.filter(department => department._id.toString() !== action.payload.data.toString())
            }
        case GET_DEPARTMENT_DETAIL_SUCCESS:
            return {
                ...state,
                data:action.payload.data
            }
        case ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                data: [action.payload.data, ...state.data]
            }
        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                data: state.data.map(department =>
                    department._id.toString() === action.payload.data._id.toString() ?
                        { department, ...action.payload.data } :
                        department
                )
            }

        //FAILS
        case GET_DEPARTMENTS_FAIL:
        case DELETE_DEPARTMENT_FAIL:
        case ADD_DEPARTMENT_FAIL:
        case UPDATE_DEPARTMENT_FAIL:
        case GET_DEPARTMENT_DETAIL_FAIL:
     
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}


export default Departments;