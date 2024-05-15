import { takeLatest, call, put } from "redux-saga/effects";
import applicationSlice from "@/store/features/application/slice";
import {
  getApplicationData,
  getApplicationManufacturers,
  getPrices,
  getBodyTypes,
} from "@/helpers/api/application";

export function* loadApplicationData(action) {
  try {
    const response = yield call(getApplicationData, action);

    if (response.success) {
      yield put(
        applicationSlice.actions.loadApplicationDataSuccess(response.data)
      );
    } else {
      yield put(applicationSlice.actions.loadApplicationDataError("Error..."));
    }
  } catch (e) {
    yield put(applicationSlice.actions.loadApplicationDataError(e.message));
  }
}

export function* applicationSaga() {
  yield takeLatest(
    applicationSlice.actions.initiateLoadApplicationData,
    loadApplicationData
  );
}
