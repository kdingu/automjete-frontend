import ApolloClient from "@/helpers/apollo-wrapper";
import { gql } from "@apollo/client";

const query = gql`
    query Accounts($where: AccountWhereUniqueInput!) {
        account(where: $where) {
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
            owner {
                id
                type
            }
        }
    }
`;

export const getDealer = async (id) => {
  try {
    const { data, error } = await ApolloClient.query({
      variables: { where: { id } },
      query,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: data.account };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
};

export const getDealers = async () => {
  try {
    const { data, error } = await ApolloClient.query({
      variables: {
        "where": {
          "owner": {
            "type": {
              "equals": "s1_dealer",
            },
          },
        },
      },
      query: gql`
          query Dealers($where: AccountWhereInput!) {
              accounts(where: $where) {
                  id
                  name
                  phone
                  address {
                      country {
                          name
                      }
                      city {
                          name
                      }
                  }
                  owner {
                      id
                      vehiclesCount
                  }
              }
          }
      `,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: data.accounts };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
};
