import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  data: {
    currentCategory: {},
    categories: [],
    facets: {
      fields: [],
      attributes: []
    },
    makes: [],
    prices: {
      currencies: ["EUR", "ALL"],
      activeCurrency: "EUR",
      min: "0",
      max: "0",
      values: [],
    },
    sections: [],
  },
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    // Application
    initiateLoadApplicationData: (state) => {
      state.loading = true;
    },
    loadApplicationDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    loadApplicationDataError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default applicationSlice;
