import ApolloClient from "@/helpers/apollo-wrapper";
import { gql } from "@apollo/client";
import { getCookie } from "@/helpers/utilities/utils";
import { SESSION_EXPIRED_ERROR, SESSION_KEY } from "@/configs/constants";

const handleResponse = (data, error) => {
  if (error) {
    throw error;
  }

  return { success: true, data };
};

const updateSavedSearchesQuery = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      savedSearches
    }
  }
`;

export const updateSavedSearches = async (props) => {
  const { token, id, savedSearches } = props;
  const { data, error } = await ApolloClient.mutate({
    variables: {
      where: { id },
      data: { savedSearches },
    },
    mutation: updateSavedSearchesQuery,
    context: {
      headers: {
        authorization: `${token ? token : ""}`,
      },
    },
  });

  return handleResponse(data.authenticatedItem, error);
};

const updateSavedVehiclesQuery = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      savedVehicles
    }
  }
`;

export const updateSavedVehicles = async (props) => {
  const { token, id, savedVehicles } = props;
  const { data, error } = await ApolloClient.mutate({
    variables: {
      where: { id },
      data: { savedVehicles },
    },
    mutation: updateSavedVehiclesQuery,
    context: {
      headers: {
        authorization: `${token ? token : ""}`,
      },
    },
  });

  return handleResponse(data.authenticatedItem, error);
};

const updateUserQuery = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      updatedAt
    }
  }
`;

export const updateUser = async (user) => {
  const token = getCookie(SESSION_KEY);
  const { data, error } = await ApolloClient.mutate({
    variables: {
      where: { id: user.id },
      data: { name: user.name },
    },
    mutation: updateUserQuery,
    context: {
      headers: {
        authorization: `${token ? token : ""}`,
      },
    },
  });

  return handleResponse(data.updateUser, error);
};

const updatePasswordQuery = gql`
  mutation updatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data) {
      success
      message
    }
  }
`;

export const updatePassword = async (passwords) => {
  const token = getCookie(SESSION_KEY);
  const { data, error } = await ApolloClient.mutate({
    variables: {
      data: {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        newPassword2: passwords.newPassword2,
      },
    },
    mutation: updatePasswordQuery,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  console.log("123", { data, error });

  if (!data.updatePassword.success)
    return handleResponse(null, data.updatePassword.message);

  return handleResponse(data, error);
};

const updateAccountQuery = gql`
  mutation UpdateAccount(
    $where: AccountWhereUniqueInput!
    $data: AccountUpdateInput!
  ) {
    updateAccount(where: $where, data: $data) {
      updatedAt
    }
  }
`;

export const updateAccount = async (id, accountData) => {
  const token = getCookie(SESSION_KEY);

  console.log("updateAccount", {id, accountData});

  const { data, error } = await ApolloClient.mutate({
    variables: {
      where: {
        id,
      },
      data: {
        email: accountData.email,
        name: accountData.name,
        phone: accountData.phone,
        website: accountData.website,
        openHours: accountData.openHours,
        descriptionAl: accountData.descriptionAl,
        descriptionEn: accountData.descriptionEn,
        faqAl: accountData.faqAl,
        faqEn: accountData.faqEn,
      },
    },
    mutation: updateAccountQuery,
    context: {
      headers: {
        authorization: `${token ? token : ""}`,
      },
    },
  });

  return handleResponse(data, error);
};
