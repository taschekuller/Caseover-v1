import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA
} from "./actionTypes";

import {
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAIL
} from "./../companies/actionTypes"

const INIT_STATE = {
    chartsData: [],
    Companies: [],
    error: null
};

const Dashboard = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_SUCCESS:
            switch (action.payload.actionType) {
                case GET_CHARTS_DATA:
                    return {
                        ...state,
                        chartsData: action.payload.data
                    };
                default:
                    return state;
            }
        case API_FAIL:
            switch (action.payload.actionType) {
                case GET_CHARTS_DATA:
                    return {
                        ...state,
                        chartsDataError: action.payload.error
                    };


                default:
                    return state;
            }
        case GET_COMPANIES_SUCCESS:
            return {
                ...state,
                Companies: action.payload.data
            }
        case GET_COMPANIES_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}


export default Dashboard;