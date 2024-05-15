import { getPage } from "@/helpers/api/application";
import { END } from "redux-saga";

export const serverUsePageData = async (code = "") => {
  let pageData = {notFound: 404};

  const { success, error, data } = await getPage(code);

  if (error) console.error("getPage homepage error", error);
  if (success) pageData = data;

  return pageData;
};

export const ssrStoreActions = async (store, actions = []) => {
  if (actions.length === 0) return;

  actions.forEach(action => store.dispatch(action));
  store.dispatch(END);
  await store.sagaTask.toPromise();
};
