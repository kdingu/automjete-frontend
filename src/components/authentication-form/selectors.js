import {getSessionError} from "@/helpers/selectors/session";

export const getAuthFormSelectors = (state) => {
    return {
        authError: getSessionError(state),
    };
};
