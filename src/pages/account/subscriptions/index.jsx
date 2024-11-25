import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import WorkInProgress from "@/components/work-in-progress";

function Subscriptions() {
    return (
        <MainLayout>
            <Container className="my-10">
                <div>Boost 1</div>
                <div>Boost 2</div>
                <div>Boost 3</div>
                <WorkInProgress/>
            </Container>
        </MainLayout>
    );
}

export default Subscriptions;

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
