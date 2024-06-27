import {call, put, takeLatest} from "redux-saga/effects";
import searchSlice from "@/store/features/search/slice";
import {doSearch} from "@/helpers/api/search";

export function* doSearchSaga(action) {
    try {
        const response = yield call(doSearch, action.payload);

        if (response.success) {
            yield put(searchSlice.actions.searchSuccess(response));
        } else {
            yield put(searchSlice.actions.searchError(response.error));
        }
    } catch (e) {
        yield put(searchSlice.actions.searchError(e.message));
    }
}

export function* searchSaga() {
    yield takeLatest(searchSlice.actions.initiateSearch, doSearchSaga);
}
