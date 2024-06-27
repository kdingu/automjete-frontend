import {all} from "redux-saga/effects";
import {applicationSaga} from "@/store/sagas/application/saga";
import {sessionSaga} from "@/store/sagas/session/saga";
import {searchSaga} from "@/store/sagas/search/saga";

export default function* rootSaga() {
    yield all([applicationSaga(), sessionSaga(), searchSaga()]);
}
