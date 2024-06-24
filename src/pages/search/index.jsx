import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import SubTitle from "@/components/sub-title";
import Title from "@/components/title";
import {connect} from "react-redux";
import useFilters from "@/helpers/hooks/useFilters";
import React from "react";
import Button from "@/components/button";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import SideFilters from "@/components/filters/side-filters";
import MainFilters from "@/components/filters/main-filters";

const Search = (props) => {
    const router = useRouter();

    const onSubmit = (values) => {
        router.push({
            pathname: "/search/results",
            query: router.query,
        });
    };

    const filters = useFilters({onSubmit});

    return (
        <MainLayout>
            <Container className="my-10">
                <SubTitle className="hidden md:block">ADVANCED SEARCH</SubTitle>
                <Title className="hidden md:block">Search the largest choice of cars</Title>

                <br className="hidden md:block my-6"/>

                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-12 lg:col-span-4 pt-1">
                        <SideFilters filters={filters}/>
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <MainFilters filters={filters}/>
                    </div>
                </div>

                <div>
                    <div className="p-4 text-center">
                        <Button
                            className="mr-2 w-32"
                            variant="outline"
                            text="Clear form"
                            onClick={filters.methods.handleClear}
                        />
                        <Button
                            className="w-32"
                            text="Search"
                            onClick={() => filters.formik.submitForm()}
                        />
                    </div>
                </div>
            </Container>
        </MainLayout>
    );
};

const selectSearchPageProps = (state) => {
    return {
        manufacturers: state.application.manufacturers,
        searchParameters: state.search.parameters,
        prices: state.application.prices,
        bodyTypes: state.application.bodyTypes,
    };
};

export default connect(selectSearchPageProps)(Search);

export const getServerSideProps = async ({req, res, locale}) => {
    // const locales = await serverSideTranslations(locale ?? "al", ["common", "search"]);

    return {
        props: {
            // ...locales,
        },
    };
};
