import ApolloClient, { apolloQuery } from "@/helpers/apollo-wrapper";
import { gql } from "@apollo/client";

export const getApplicationData = async (action) => {
  const query = gql`
      query ApplicationData($categorySlug: String!) {
          applicationData(categorySlug: $categorySlug)
      }
  `;

  const { data, error } = await apolloQuery(query, {categorySlug: action.payload});

  if (error) {
    return { success: false, error };
  }

  return {
    success: true,
    data: data.applicationData
  };
};

export const getPage = async (code = "") => {
  const { data, error } = await ApolloClient.query({
    variables: {
      where: {
        code,
      },
    },
    query: gql`
        query Page($where: PageWhereUniqueInput!) {
            page(where: $where) {
                id
                code
                showLinksIn
                type
                configuration
                titleAl
                titleEn
                contentAl {
                    document
                }
                contentEn {
                    document
                }
                descriptionAl
                descriptionEn
                createdAt
                updatedAt
            }
        }
    `,
  });

  if (error) {
    return { success: false, error };
  }

  if (!data.page) {
    return { success: false, error: "404" };
  }

  return { success: true, data: data.page };
};
