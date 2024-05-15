export const getSession = (state) => state.session || {};

export const getSessionLoading = (state) => getSession(state).loading || false;
export const getSessionLoggedIn = (state) =>
  getSession(state).loggedIn || false;
export const getSessionUser = (state) => getSession(state).user || {};
export const getSessionToken = (state) => getSession(state).token || "";
export const getSessionError = (state) => getSession(state).error || "";
export const getSessionAccount = (state) => getSession(state).account || {};
export const getSessionUserId = (state) => getSessionUser(state).id || "";
export const getSessionUserSavedSearches = (state) => getSessionUser(state).savedSearches || {};
export const getSessionUserSavedVehicles = (state) => getSessionUser(state).savedVehicles || [];
