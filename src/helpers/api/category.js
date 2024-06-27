import ApolloClient from "@/helpers/apollo-wrapper";
import {gql} from "@apollo/client";

export const getCategory = async (id) => {
    try {
        const {data, error} = await ApolloClient.query({
            variables: {where: {id}},
            query: gql`
                query Category($where: CategoryWhereUniqueInput!) {
                    category(where: $where) {
                        id
                        name
                        slug
                        attributes {
                            id
                            code
                            group
                            label
                            type
                            options {
                                id
                                label
                                value
                            }
                        }
                    }
                }
            `,
        });

        if (error) {
            return {success: false, error};
        }

        return {success: true, data: data.category};
    } catch (e) {
        return {success: false, error: e.toString()};
    }
};
