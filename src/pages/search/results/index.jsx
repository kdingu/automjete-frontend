import React, {useEffect, useMemo, useState} from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import searchSlice, {SORT_OPTIONS} from "@/store/features/search/slice";
import {connect, useDispatch} from "react-redux";
import sessionSlice from "@/store/features/session/slice";
import useFilters from "@/helpers/hooks/useFilters";
import VehicleCard from "@/components/vehicle-card";
import Pagination from "@/components/pagination";
import ResultsDetailedFilters from "@/components/results-detailed-filters";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ResultsDetailedFiltersMobile from "@/components/results-detailed-filters-mobile";
import {
    getSessionLoggedIn,
    getSessionToken,
    getSessionUserId,
    getSessionUserSavedSearches,
    getSessionUserSavedVehicles,
} from "@/helpers/selectors";
import {getCurrentCategory, getCurrentCategoryId,} from "@/helpers/selectors/categories";
import {useRouter} from "next/router";
import SaveSearch from "@/components/results-detailed-filters/save-search";
import Modal from "@/components/modal";
import Input from "@/components/input";
import Select from "@/components/select";
import useSavedVehiclesUpdater from "@/helpers/hooks/useSavedVehiclesUpdater";

const SearchResults = (props) => {
    const {
        search,
        savedSearches,
        savedVehicles,
        token,
        userId,
        category,
        currentCategoryId,
        loggedIn,
    } = props;

    const {
        loading,
        page,
        limit,
        totalPages,
        results,
        resultsCount,
        facets,
        parameters,
        sort
    } = search;

    const [isSaveSearchModalOpen, setIsSaveSearchModalOpen] = useState(false);
    const [savedSearchTitle, setSavedSearchTitle] = useState("");

    const filters = useFilters();
    const router = useRouter();
    const dispatch = useDispatch();

    const savedSearchExists = useMemo(() => {
        if (!savedSearches || !search) return false;

        return savedSearches?.searched?.some((savedSearch) =>
            Object.keys(savedSearch.parameters).every(
                (searchKey) =>
                    savedSearch.parameters[searchKey] ===
                    (search.parameters[searchKey] || "")
            )
        );
    }, [savedSearches, search]);

    const handleChangePage = (page) => {
        props.dispatch(searchSlice.actions.setSearch({page}));
    };

    const handleChangeSort = (event) => {
        props.dispatch(searchSlice.actions.setSearch({sort: event.target.value}));
    };

    const handleSaveSearch = () => {
        if (!savedSearchExists) {
            dispatch(
                sessionSlice.actions.updateSavedSearches({
                    token: token,
                    id: userId,
                    savedSearches: {
                        searched: [
                            ...(savedSearches?.searched || []),
                            {
                                category: currentCategoryId,
                                name: savedSearchTitle,
                                parameters: search.parameters,
                            },
                        ],
                    },
                })
            );
            setSavedSearchTitle("");
            setIsSaveSearchModalOpen(false);
        }
    };

    const updateSavedVehicles = useSavedVehiclesUpdater(savedVehicles);

    const handleSaveVehicle = (e, vehicle) => {
        e.stopPropagation();
        updateSavedVehicles(vehicle);
    };

    const handleOpenModal = () => {
        if (savedSearchExists) return;
        if (loggedIn) {
            setIsSaveSearchModalOpen(true);
        } else router.replace("/authentication");
    };

    const params = JSON.stringify(parameters);

    useEffect(() => {
        dispatch(searchSlice.actions.setSearch({page: 1}));
    }, [params]);

    useEffect(() => {
        dispatch(
            searchSlice.actions.initiateSearch({
                page,
                limit,
                category: category.slug,
                parameters,
                sort
            })
        );
    }, [page, limit, params, sort]);

    return (
        <MainLayout>
            {isSaveSearchModalOpen && (
                <Modal
                    title="Save this search"
                    cancel={() => setIsSaveSearchModalOpen(false)}
                    submit={handleSaveSearch}
                    submitDisabled={savedSearchTitle.length === 0}
                >
                    <Input
                        id="saved-search"
                        handleChange={(e) => setSavedSearchTitle(e.target.value)}
                        value={savedSearchTitle}
                    />
                </Modal>
            )}

            <ResultsDetailedFiltersMobile filters={filters}/>

            <Container className="my-2 lg:my-10">
                <div className="flex gap-10">
                    <div className="hidden pt-1 lg:block lg:w-3/12">
                        <ResultsDetailedFilters
                            filters={filters}
                            totalVehicles={resultsCount}
                            searchLoading={loading}
                            handleSaveSearch={() => handleOpenModal()}
                            savedSearchExists={savedSearchExists}
                            category={category}
                        />
                    </div>

                    <div className="pt-1 lg:w-9/12">
                        <div className="mb-2 flex items-center justify-between lg:mb-7">
                            <Pagination
                                mini
                                currentPage={page}
                                totalPages={totalPages}
                                onChange={handleChangePage}
                            />
                            <div className="lg:hidden">
                                <SaveSearch
                                    handleSaveSearch={() => handleOpenModal()}
                                    savedSearchExists={savedSearchExists}
                                />
                            </div>
                            <div className="hidden lg:block">
                                <Select
                                    labelPosition="left"
                                    label="Sort"
                                    noPlaceholder
                                    data={SORT_OPTIONS}
                                    value={sort}
                                    onChange={handleChangeSort}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            {loading
                                ? new Array(limit).fill(1).map((_, index) => {
                                    return <VehicleCard key={index} skeleton/>;
                                })
                                : results.map((vehicle) => {
                                    return (
                                        <VehicleCard
                                            key={vehicle.id}
                                            {...vehicle}
                                            handleSaveVehicle={handleSaveVehicle}
                                            savedVehiclesExists={savedVehicles.vehicles?.find(
                                                (vehicleData) => vehicleData.id === vehicle.id
                                            )}
                                            disableSave={!loggedIn}
                                        />
                                    );
                                })}
                        </div>

                        <div className="mt-4 flex justify-center">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </MainLayout>
    );
};

const getSearchResultsPageData = (state) => {
    return {
        search: state.search,
        loggedIn: getSessionLoggedIn(state),
        savedSearches: getSessionUserSavedSearches(state),
        savedVehicles: getSessionUserSavedVehicles(state),
        token: getSessionToken(state),
        userId: getSessionUserId(state),
        category: getCurrentCategory(state),
        currentCategoryId: getCurrentCategoryId(state),
    };
};

export default connect(getSearchResultsPageData)(SearchResults);

export const getServerSideProps = async ({req, res, locale}) => {
    // const locales = await serverSideTranslations(locale ?? "al", ["common", "search"]);

    return {
        props: {
            // ...locales,
        },
    };
};
