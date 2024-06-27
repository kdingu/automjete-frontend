import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import Title from "@/components/title";
import React, {useState} from "react";
import {connect} from "react-redux";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MotorsImage from "@/components/motors-image";
import ModelCard from "@/components/model-card";
import Select from "@/components/select";
import {uniq} from "lodash";
import Button from "@/components/button";

const Search = (props) => {
    const {makeSlug, makes} = props

    const [family, setFamily] = useState('')

    const make = makes.find(make => make.slug === makeSlug)
    const models = make.models.filter(model => family.trim() ? model.family === family.trim() : true)
    const families = uniq(make.models.map(model => model.family))

    const handleChangeModelFamily = (e) => {
        setFamily(e.target.value)
    };

    const handleClearFilters = () => {
        setFamily('')
    };

    return (
        <MainLayout>
            <div className="py-12 md:py-24 bg-white">
                <Container>
                    <div className="flex gap-4 items-center">
                        <MotorsImage src="" width={120} height={120}/>
                        <Title className="!inline-block">{make.name} models</Title>
                    </div>
                </Container>
            </div>
            <div className="bg-[#F7F6F5] pt-6 pb-28">
                <Container className="grid grid-cols-12 gap-6">
                    <section className="col-span-12 md:col-span-4">
                        <div className="bg-white p-6">
                            <div className="flex justify-between items-end mb-4">
                                <div className="text-2xl">Filters</div>
                                <Button variant="text" onClick={handleClearFilters}>Clear all</Button>
                            </div>

                            <Select
                                label="Models"
                                placeholderLabel="Any"
                                data={families.map(fam => ({label: fam, value: fam}))}
                                onChange={handleChangeModelFamily}
                                value={family}
                            />
                        </div>
                    </section>
                    <section className="col-span-12 md:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {models.map(model => {
                                const data = {
                                    brandName: make.name,
                                    brandSlug: make.slug,
                                    modelName: model.name,
                                    modelSlug: model.slug
                                };

                                return <ModelCard key={model.slug} data={data}/>
                            })}
                        </div>
                    </section>
                </Container>
            </div>
        </MainLayout>
    );
};

const getProps = (state) => {
    return {
        makes: state.application.data.makes
    }
};

export default connect(getProps)(Search);

export const getServerSideProps = async ({req, res, locale, params}) => {
    // const locales = await serverSideTranslations(locale ?? "al", ["common", "search"]);

    return {
        props: {
            makeSlug: params.id,
            // ...locales,
        },
    };
};
