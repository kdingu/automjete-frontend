import { getSessionError, getSessionLoggedIn } from "@/helpers/selectors";
import { getCategories } from "@/helpers/selectors/categories";

export const getHeaderSelectors = (state) => {
  return {
    categories: getCategories(state),
    userLoggedIn: getSessionLoggedIn(state),
    sessionError: getSessionError(state),
  };
};
