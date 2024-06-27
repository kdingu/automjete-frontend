import ApolloClient from "@/helpers/apollo-wrapper";
import {gql} from "@apollo/client";
import {DEFAULT_CATEGORY_SLUG} from "@/configs/constants";

export const doSearch = async ({page = 1, limit = 2, category = DEFAULT_CATEGORY_SLUG, parameters = {}}) => {
    const {data, error} = await ApolloClient.query({
        variables: {
            params: {
                page: Number(page),
                limit: Number(limit),
                category,
                parameters
            }
        },
        query: gql`
            query Search($params: SearchQueryArguments!) {
                search(params: $params) {
                    results {
                        id
                        createdAt
                        updatedAt
                        name
                        title
                        description
                        price
                        images {
                            image {
                                id
                                filesize
                                width
                                height
                                extension
                                url
                            }
                            id
                            name
                            externalUrl
                        }
                        imagesCount
                        make {
                            name
                            slug
                        }
                        model {
                            name
                            slug
                        }
                        owner {
                            id
                            name
                            email
                            vehiclesCount
                        }
                    }
                    page
                    totalPages
                    limit
                    resultsCount
                }
            }
        `,
    });

    if (error) {
        return {success: false, error};
    }

    return {success: true, data: data?.search || {results: []}};
};
