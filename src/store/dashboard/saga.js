import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import { GET_CHARTS_DATA } from "./actionTypes";
import { apiSuccess, apiFail } from "./actions";

//Include Both Helper File with needed methods 

 

export function* watchGetChartsData() {
     
}

function* dashboardSaga() {
    yield all([fork(watchGetChartsData)]);
}

export default dashboardSaga;
