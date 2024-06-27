import {createSlice} from "@reduxjs/toolkit";
import {eraseCookie} from "@/helpers/utilities/utils";
import {SESSION_KEY} from "@/configs/constants";

const initialState = {
    loading: false,
    loggedIn: false,
    token: "",
    user: {},
    account: {},
};

const resetState = (state) => {
    state.loading = false;
    state.loggedIn = false;
    state.token = "";
    state.user = {};
    state.account = {};
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        // login
        login: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.user = action.payload.data.authenticateUserWithPassword.item;
            state.account =
                action.payload.data.authenticateUserWithPassword.item.account;
            state.token =
                action.payload.data.authenticateUserWithPassword.sessionToken;
        },
        loginError: (state, action) => {
            state.error = action.payload;
            resetState(state);
        },
        // register
        register: (state) => {
            state.loading = true;
        },
        registerSuccess: (state) => {
            state.loading = false;
            window.location.href = "/authentication";
        },
        registerError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // logout
        logout: (state) => {
            resetState(state);
            eraseCookie(SESSION_KEY);
            window.location.href = "/";
        },
        // current user
        getCurrentUser: (state) => {
            state.loading = true;
        },
        getCurrentUserSuccess: (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.user = action.payload.data;
            state.account = action.payload.data.account;
            state.token = action.payload.token;
        },
        getCurrentUserError: (state, action) => {
            state.error = action.payload;
            resetState(state);
        },
        resetAuthError: (state) => {
            state.error = "";
        },
        updateSavedSearches: (state) => {
            state.loading = true;
        },
        updateSavedSearchesSuccess: (state, action) => {
            state.loading = false;
            state.user.savedSearches = action.payload.data.savedSearches
        },
        updateSavedSearchesError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateSavedVehicles: (state) => {
            state.loading = true;
        },
        updateSavedVehiclesSuccess: (state, action) => {
            state.loading = false;
            state.user.savedVehicles = action.payload.data.savedVehicles
        },
        updateSavedVehiclesError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default sessionSlice;
