import {createSlice} from "@reduxjs/toolkit";

export const SORT_OPTIONS = [
    {value: "sort_price_asc", label: "Price Ascending"},
    {value: "sort_price_desc", label: "Price Descending"},
    {value: "sort_relevance", label: "Relevance"}
];

export const DEFAULT_SORT = "sort_relevance";

const initialState = {
    loading: false,
    page: 1,
    limit: 10,
    totalPages: 1,
    sort: DEFAULT_SORT,
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
