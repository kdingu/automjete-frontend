import { takeLatest, call, put } from "redux-saga/effects";
import sessionSlice from "@/store/features/session/slice";
import { login, getCurrentUser, register } from "@/helpers/api/auth";
import {eraseCookie, setCookie} from "@/helpers/utilities/utils";
import { SESSION_KEY } from "@/configs/constants";
import { updateSavedSearches, updateSavedVehicles } from "@/helpers/api/user";

export function* registerSaga(action) {
  try {
    const response = yield call(register, action);

    if (response.success) {
      yield put(sessionSlice.actions.registerSuccess(response));
    } else {
      yield put(sessionSlice.actions.registerError(response.error));
    }
  } catch (e) {
    yield put(sessionSlice.actions.registerError(e.message));
  }
}

export function* loginSaga(action) {
  try {
    const response = yield call(login, action);

    if (response.success) {
      yield put(sessionSlice.actions.loginSuccess(response));

      const token = response.data.authenticateUserWithPassword.sessionToken;
      setCookie(SESSION_KEY, token);
    } else {
      yield put(sessionSlice.actions.loginError(response.error));
    }
  } catch (e) {
    yield put(sessionSlice.actions.loginError(e.message));
  }
}

export function* getCurrentUserSaga(action) {
  if (action.payload) {
    try {
      const response = yield call(getCurrentUser, action.payload);

      if (response.success) {
        yield put(sessionSlice.actions.getCurrentUserSuccess({ ...response, token: action.payload }));
      } else {
        yield put(sessionSlice.actions.getCurrentUserError(response.error));
      }
    } catch (e) {
      yield put(sessionSlice.actions.getCurrentUserError(e.message));
    }
  } else {
    yield put(
      sessionSlice.actions.getCurrentUserError("No session token found."),
    );
  }
}

export function* updateSavedSearchesSaga(action) {
  if (action.payload) {
    try {
      const response = yield call(updateSavedSearches, action.payload);

      if (response.success) {
        yield put(sessionSlice.actions.updateSavedSearchesSuccess({ ...response, data: action.payload }));
      } else {
        yield put(sessionSlice.actions.updateSavedSearchesError(response.error));
      }
    } catch (e) {
      yield put(sessionSlice.actions.updateSavedSearchesError(e.message));
    }
  } else {
    yield put(
      sessionSlice.actions.updateSavedSearchesError("No session token found."),
    );
  }
}

export function* updateSavedVehiclesSaga(action) {
  if (action.payload) {
    try {
      const response = yield call(updateSavedVehicles, action.payload);

      if (response.success) {
        yield put(sessionSlice.actions.updateSavedVehiclesSuccess({ ...response, data: action.payload }));
      } else {
        yield put(sessionSlice.actions.updateSavedVehiclesError(response.error));
      }
    } catch (e) {
      yield put(sessionSlice.actions.updateSavedVehiclesError(e.message));
    }
  } else {
    yield put(
      sessionSlice.actions.updateSavedVehiclesError("No session token found."),
    );
  }
}

export function* sessionSaga() {
  yield takeLatest(sessionSlice.actions.register, registerSaga);

  yield takeLatest(sessionSlice.actions.login, loginSaga);

  yield takeLatest(sessionSlice.actions.getCurrentUser, getCurrentUserSaga);

  yield takeLatest(sessionSlice.actions.updateSavedSearches, updateSavedSearchesSaga);

  yield takeLatest(sessionSlice.actions.updateSavedVehicles, updateSavedVehiclesSaga);
}
