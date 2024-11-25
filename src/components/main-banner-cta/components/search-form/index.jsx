import React from "react";
import Button from "@/components/button";
import {getSearchFormData} from "@/components/main-banner-cta/selectors";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import useFilters from "@/helpers/hooks/useFilters";
import {useTranslation} from "next-i18next";

const SearchForm = (props) => {
    const {t} = useTranslation();
    const router = useRouter();

    const onSubmit = (values) => {
        router.push({
            pathname: "/search/results",
            query: router.query,
        });
    };

    const filters = useFilters({onSubmit});

    return (
        <form
            onSubmit={filters.formik.handleSubmit}
            className="relative z-10 w-96 rounded bg-white p-4"
        >
            <h2 className="mb-4 text-center">{t("find your perfect car")}</h2>

            {filters.facets.fields.map((field) => {
                return (
                    <div key={field.facet} className={`gap-4 mb-3 grid grid-cols-${field.filters.length > 1 ? 2 : 1}`}>
                        {field.filters.map((filter) => {
                            return (
                                <div key={filter.filter}>
                                    {filters.methods.getComponentForFilter(filter)}
                                </div>
                            );
                        })}
                    </div>
                );
            })}

            <Button
                className="w-full"
                icon="search"
                text={t("search")}
                onClick={filters.formik.handleSubmit}
            />

            <div className="mt-1 flex justify-between">
                <Button variant="link" text={t("reset")} onClick={filters.formik.handleReset}/>
                <Button
                    variant="link"
                    text={t("more options")}
                    onClick={() => router.push("/search")}
                />
            </div>
        </form>
    );
};

export default connect(getSearchFormData)(SearchForm);
