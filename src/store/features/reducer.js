import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import applicationSlice from "@/store/features/application/slice";
import searchSlice from "@/store/features/search/slice";
import sessionSlice from "@/store/features/session/slice";
import _ from "lodash";

const sliceReducer = {
  [applicationSlice.name]: applicationSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
};

const rootReducer = (state, action) => {
  // Doc: https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
  if (action.type === HYDRATE) {
    const hydrated = _.merge({}, action.payload, state);

    hydrated.session = action.payload.session;

    return hydrated;
  }

  return combineReducers(sliceReducer)(state, action);
};

export default rootReducer;
