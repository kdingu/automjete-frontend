import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { IS_DEV } from "@/configs/constants";

const uri =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "https://countries.trevorblades.com";

export const httpLink = createHttpLink({ uri });

if (IS_DEV) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const createApolloClient = () => {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache',
      errorPolicy: 'all',
    },
  }

  if (IS_DEV) {
    defaultOptions.watchQuery.fetchPolicy = "no-cache";
    defaultOptions.query.fetchPolicy = "no-cache";
  }

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions,
  });
};

const apollo = createApolloClient();

export default apollo;

export const apolloQuery = async (query, variables) => {
  return apollo.query({query, variables});
};
