import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import Title from "@/components/title";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import VehicleForm from "@/components/vehicle-form";
import {getVehicle, updateVehicle} from "@/helpers/api/vehicle";
import SubTitle from "@/components/sub-title";
import {scrollToTop} from "@/helpers/utilities/utils";

const EditVehicle = (props) => {
    const {id} = props;

    const [vehicle, setVehicle] = useState();
    const [initialValues, setInitialValues] = useState();

    const handleSubmit = (values) => {
        const handleSuccess = (response) => {
            scrollToTop();
            setVehicle({...vehicle, updatedAt: response.data.updateVehicle.updatedAt});
            toast.success("U kry!")
        };

        const handleError = (error) => {
            console.error(error.toString());
            toast.error("Su kry.")
        }

        updateVehicle({...values, id}, vehicle)
            .then(handleSuccess)
            .catch(handleError)
    };

    // On mount set initial values to current editing vehicle.
    useEffect(() => {
        const handleSuccess = (response) => {
            const {data = {}} = response;

            setVehicle(data);

            const initialValues = {
                make: data.make.slug,
                model: data.model.slug,
                price: data.price,
                name: data.name,
                title: data.title,
                description: data.description,
                images: [],
                owner: data.owner.id,
                category: data.category.id,
                attributeValues: data.attributeValues.reduce((prev, curr) => {
                    return {
                        ...prev,
                        [curr.attribute.code]: curr.data.value
                    }
                }, {})
            };

            setInitialValues(initialValues);
        };

        const handleError = (error) => {
            console.error('fetch vehicle error', {error: error.toString()})
        };

        getVehicle(id)
            .then(handleSuccess)
            .catch(handleError)
    }, []);

    return (
        <MainLayout>
            <Container className="mt-10 mb-32">
                <Title className="md:!text-left !font-normal">Edit advertisement</Title>
                {vehicle?.updatedAt && (
                    <SubTitle className="md:!text-left !font-normal !mb-10">
                        Last updated: {new Date(vehicle?.updatedAt).toLocaleString()}
                    </SubTitle>
                )}

                {initialValues && (
                    <VehicleForm onSubmit={handleSubmit} initialValues={initialValues}/>
                )}
            </Container>
        </MainLayout>
    );
};

export default EditVehicle;

export const getServerSideProps = async ({params}) => {
    return {
        props: {
            id: params.id || ""
        }
    }
};
