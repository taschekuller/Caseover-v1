import { 
    GET_SCHOOLS_SUCCESS, 
    GET_SCHOOLS_FAIL,
    GET_SCHOOL_DETAIL_SUCCESS,
    GET_SCHOOL_DETAIL_FAIL,
    ADD_SCHOOL_SUCCESS,
    ADD_SCHOOL_FAIL,
    UPDATE_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_FAIL,
    DELETE_SCHOOL_SUCCESS,
    DELETE_SCHOOL_FAIL
} from "./actionTypes"

const INIT_STATE = {
    data: [], 
    error: null,
   
};

const Schools = (state = INIT_STATE, action) => {
    switch (action.type) {
     
        case GET_SCHOOLS_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case DELETE_SCHOOL_SUCCESS:
            return {
                ...state,
                data: state.data.filter(school => school._id.toString() !== action.payload.data.toString())
            }
        case GET_SCHOOL_DETAIL_SUCCESS:
            return {
                ...state,
                data:action.payload.data
            }
        case ADD_SCHOOL_SUCCESS:
            return {
                ...state,
                data: [action.payload.data, ...state.data]
            }
        case UPDATE_SCHOOL_SUCCESS:
            return {
                ...state,
                data: state.data.map(school =>
                    school._id.toString() === action.payload.data._id.toString() ?
                        { school, ...action.payload.data } :
                        school
                )
            }

        //FAILS
        case GET_SCHOOLS_FAIL:
        case DELETE_SCHOOL_FAIL:
        case ADD_SCHOOL_FAIL:
        case UPDATE_SCHOOL_FAIL:
        case GET_SCHOOL_DETAIL_FAIL:
     
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}


export default Schools;