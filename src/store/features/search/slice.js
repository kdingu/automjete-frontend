import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  page: 1,
  limit: 10,
  totalPages: 1,
  parameters: {},
  results: [],
  facets: [],
};

const getTotalPages = (state, action) => {
  return Math.ceil(action.payload.data.resultsCount / state.limit);
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    setParameters: (state, action) => {
      state.parameters = {
        ...state.parameters,
        ...action.payload,
      };
    },
    setSearchLoading: (state, action) => {
      state.loading = action.payload;
    },
    initiateSearch: (state) => {
      state.loading = true;
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.results = action.payload.data.results;
      state.resultsCount = action.payload.data.resultsCount;
      state.totalPages = getTotalPages(state, action);
    },
    searchError: (state) => {
      state.loading = false;
    },
  },
});

export default searchSlice;
