import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import Button from "@/components/button";
import {useRouter} from "next/router";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const NotFound = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <MainLayout>
            <Container>
                <div className="min-h-[50vh] flex flex-col justify-center items-center pb-20">
                    <h1 className="text-2xl mb-3">Page not found (404)</h1>
                    <Button onClick={handleGoBack}>Go Back</Button>
                </div>
            </Container>
        </MainLayout>
    );
};

export default NotFound;

export const getStaticProps = async ({locale}) => ({
    props: {
        // ...await serverSideTranslations(locale, ['common', '404']),
    },
})
