import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";

function Subscriptions() {
    return (
        <MainLayout>
            <Container className="my-10">Subscriptions</Container>
        </MainLayout>
    );
}

export default Subscriptions;

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
