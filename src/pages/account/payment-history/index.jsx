import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";

function PaymentHistory() {
    return (
        <MainLayout>
            <Container className="my-10">PaymentHistory</Container>
        </MainLayout>
    );
}

export default PaymentHistory;

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
