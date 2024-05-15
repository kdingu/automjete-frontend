import ApolloClient from "@/helpers/apollo-wrapper";
import {gql} from "@apollo/client";
import {getCookie} from "@/helpers/utilities/utils";
import {SESSION_KEY} from "@/configs/constants";

const query = gql`
    query Vehicles($where: VehicleWhereUniqueInput!) {
        vehicle(where: $where) {
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
    }
`;

export const getVehicle = async (id) => {
	const {data, error} = await ApolloClient.query({
		variables: {where: {id}},
		query,
	});

	if (error) {
		return {success: false, error};
	}

	return {success: true, data: data.vehicle};
};

const transformVehiclePayload = (vehicle = {}, categoryData = {}) => {
	return {
		make: {
			connect: {slug: vehicle.make}
		},
		model: {
			connect: {slug: vehicle.model}
		},
		price: vehicle.price,
		name: vehicle.name,
		title: vehicle.title,
		description: vehicle.description,
		images: {
			create: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => ({
				externalUrl: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				name: "Dummy vehicle image",
			}))
		},
		attributeValues: {
			create: Object.keys(vehicle.attributeValues).map(code => {
				const attributeData = categoryData.attributes.find(attr => attr.code === code)

				return {
					data: {
						type: attributeData.type,
						value: vehicle.attributeValues[code]
					},
					attributeName: attributeData.label,
					attribute: {connect: {id: attributeData.id}}
				};
			})
		},
		owner: {connect: {id: vehicle.owner}},
		category: {connect: {id: vehicle.category}},
	};
};

export const createVehicle = async (vehicle = {}, categoryData = {}) => {
	const {data, error} = await ApolloClient.mutate({
		variables: {data: transformVehiclePayload(vehicle, categoryData)},
		mutation: gql`
        mutation CreateVehicle($data: VehicleCreateInput!) {
            createVehicle(data: $data) {
                id
                make {
                    name
                    slug
                }
                model {
                    name
                    slug
                }
                price
                name
                title
                description
                images {
                    externalUrl
                    name
                    image {
                        extension
                        filesize
                        height
                        id
                        url
                        width
                    }
                }
                attributeValues {
                    id
                    data
                    attributeName
                    attribute {
                        id
                        code
                    }
                }
            }
        }
		`,
		context: {
			headers: {
				"Authorization": `Bearer ${getCookie(SESSION_KEY)}`,
			}
		}
	});

	if (error) {
		return {success: false, error};
	}

	return {success: true, data: data.createVehicle};
};

export const updateVehicle = async (vehicle = {}, oldVehicle = {}) => {
	const vehicleWhere = {id: vehicle.id};

	const vehicleData = {
		make: {
			connect: {
				slug: vehicle.make
			}
		},
		model: {
			connect: {
				slug: vehicle.model
			}
		},
		price: vehicle.price,
		name: vehicle.name,
		title: vehicle.title,
		description: vehicle.description,
		images: {
			create: [1, 2, 3].map(() => ({
				externalUrl: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				name: "Dummy vehicle image",
			}))
		},
	};

	const attributesData = oldVehicle.attributeValues.map(attrValue => {
		return {
			where: {id: attrValue.id},
			data: {
				data: {
					type: attrValue.data.type,
					value: vehicle.attributeValues[attrValue.attribute.code]
				}
			}
		};
	});

	const {data, error} = await ApolloClient.mutate({
		variables: {
			where: vehicleWhere,
			data: vehicleData,
			attributesData
		},
		mutation: gql`
        mutation UpdateVehicle(
						$where: VehicleWhereUniqueInput!,
						$data: VehicleUpdateInput!
            $attributesData: [VehicleAttributeValueUpdateArgs!]!
				) {
            updateVehicle(where: $where, data: $data) {
								id
								updatedAt
            }
            updateVehicleAttributeValues(data: $attributesData) {
                id
                updatedAt
            }
        }
		`,
		context: {
			headers: {
				"Authorization": `Bearer ${getCookie(SESSION_KEY)}`,
			}
		}
	});

	if (error) {
		return {success: false, error};
	}

	return {success: true, data: data};
};
