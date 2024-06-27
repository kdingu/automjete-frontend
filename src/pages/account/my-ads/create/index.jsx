import React from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import Title from "@/components/title";
import {scrollToTop} from "@/helpers/utilities/utils";
import {createVehicle} from "@/helpers/api/vehicle";
import VehicleForm from "@/components/vehicle-form";

const CreateAd = () => {
    const router = useRouter();

    const handleSubmit = async (values, categoryData) => {
        const handleSuccess = () => {
            scrollToTop();
            router.push("/account/my-ads");
            toast.success("U kry!")
        }

        const handleError = (e) => {
            console.error(e.toString());
            toast.error("Su kry.")
        }

        createVehicle(values, categoryData)
            .then(handleSuccess)
            .catch(handleError)
    };

    return (
        <MainLayout>
            <Container className="mt-10 mb-32">
                <Title className="md:!text-left !font-normal !mb-10">Create an advertisement</Title>
                <VehicleForm onSubmit={handleSubmit}/>
            </Container>
        </MainLayout>
    );
};

export default CreateAd;

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
