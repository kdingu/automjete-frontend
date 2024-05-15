import ApolloClient from "@/helpers/apollo-wrapper";
import { gql } from "@apollo/client";
import {SESSION_EXPIRED_ERROR} from "@/configs/constants";

const handleResponse = (data, error) => {
  if (error) {
    return { success: false, error };
  }

  return { success: true, data };
};

const loginQuery = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          account {
            id
            name
            phone
            email
            website
            banner {
              externalUrl
            }
            logo {
              externalUrl
            }
            address {
              address_line_1
              address_line_2
              zip_code
              coordinates
              city {
                name
              }
              country {
                name
                code
              }
            }
            descriptionAl
            descriptionEn
            faqAl
            faqEn
            openHours
            subscription
            vehiclesCount
            vehicles {
              id
              createdAt
              updatedAt
              name
              title
              description
              price
              attributeValues {
                id
                attribute {
                  group
                  code
                  label
                  type
                  options {
                    label
                    value
                  }
                }
                attributeName
                data
              }
              images {
                id
                createdAt
                updatedAt
                image {
                  id
                  filesize
                  width
                  height
                  extension
                  url
                }
                name
                externalUrl
              }
              imagesCount
              make {
                slug
                name
              }
              model {
                slug
                name
              }
              category {
                id
                createdAt
                updatedAt
                slug
                name
              }
              owner {
                id
                createdAt
                updatedAt
                name
                email
                logo {
                  externalUrl
                  image {
                    id
                    filesize
                    width
                    height
                    extension
                    url
                  }
                }
                address {
                  id
                  createdAt
                  updatedAt
                  zip_code
                  address_line_1
                  address_line_2
                }
              }
            }
            owner {
              id
            }
          }
          avatar {
            image {
              url
              width
              height
              filesize
              extension
              id
            }
          }
          createdAt
          email
          name
          role
          type
          id
          savedSearches
          savedVehicles
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const getCurrentUserQuery = gql`
  query User {
    authenticatedItem {
      ... on User {
        id
        createdAt
        name
        email
        role
        savedSearches
        savedVehicles
        type
        active
        account {
          id
          name
          phone
          email
          website
          banner {
            externalUrl
          }
          logo {
            externalUrl
          }
          address {
            address_line_1
            address_line_2
            zip_code
            coordinates
            city {
              name
            }
            country {
              name
              code
            }
          }
          descriptionAl
          descriptionEn
          faqAl
          faqEn
          openHours
          subscription
          vehiclesCount
          vehicles {
            id
            createdAt
            updatedAt
            name
            title
            description
            price
            attributeValues {
              id
              attribute {
                group
                code
                label
                type
                options {
                  label
                  value
                }
              }
              attributeName
              data
            }
            images {
              id
              createdAt
              updatedAt
              image {
                id
                filesize
                width
                height
                extension
                url
              }
              name
              externalUrl
            }
            imagesCount
            make {
              slug
              name
            }
            model {
              slug
              name
            }
            category {
              id
              createdAt
              updatedAt
              slug
              name
            }
            owner {
              id
              createdAt
              updatedAt
              name
              email
              logo {
                externalUrl
                image {
                  id
                  filesize
                  width
                  height
                  extension
                  url
                }
              }
              address {
                id
                createdAt
                updatedAt
                zip_code
                address_line_1
                address_line_2
              }
            }
          }
          owner {
            id
          }
        }
      }
    }
  }
`;

export const login = async (action) => {
  const { payload: user } = action;
  const { email, password } = user;

  const { data, error } = await ApolloClient.mutate({
    variables: {
      email,
      password,
    },
    mutation: loginQuery,
  });

  if (
    !error &&
    data?.authenticateUserWithPassword?.__typename ===
      "UserAuthenticationWithPasswordFailure"
  )
    return {
      success: false,
      error: data.authenticateUserWithPassword?.message,
    };

  return handleResponse(data, error);
};

export const logout = async () => {
  /* Not needed atm because Keystone JS is using stateless sessions */
};

export const register = async (action) => {
  const { payload: user } = action;
  const { email = "", name = "", password = "" } = user;

  const { data, error } = await ApolloClient.mutate({
    variables: {
      data: {
        email,
        name,
        password,
      },
    },
    mutation: gql`
      mutation CreateUser($data: UserCreateInput!) {
        createUser(data: $data) {
          id
          createdAt
          email
          name
          role
          type
        }
      }
    `,
  });

  return handleResponse(data, error);
};

export const getCurrentUser = async (token) => {
  const { data, error } = await ApolloClient.query({
    query: getCurrentUserQuery,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  if (!data.authenticatedItem) return handleResponse(null, SESSION_EXPIRED_ERROR);

  return handleResponse(data.authenticatedItem, error);
};
