import React, {useRef, useState} from "react";
import Button from "@/components/button";
import SvgIcon from "@/components/svg-icon";
import Container from "@/components/container";
import SideFilters from "@/components/filters/side-filters";
import MainFilters from "@/components/filters/main-filters";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

const ResultsDetailedFiltersMobile = (props) => {
    const {filters} = props;

    const root = useRef();

    const [isFiltersUiOpen, setIsFiltersUiOpen] = useState(false);

    const handleToggleFiltersUi = () => {
        setIsFiltersUiOpen(is => {
            if (is) enableBodyScroll(root);
            if (!is) disableBodyScroll(root);
            return !is;
        });
    };

    const handleSearch = () => {
        setTimeout(() => {
            handleToggleFiltersUi();
        }, 100);
    };

    const handleClear = () => {
        setTimeout(() => {
            filters.methods.handleClear();
            handleToggleFiltersUi();
        }, 100);
    };

    return (
        <div>
            <div className="lg:hidden bg-white py-4 sticky top-0 left-0 right-0 z-10">
                <Container className="flex gap-1">
                    <Button variant="outline" className="group w-full" onClick={handleToggleFiltersUi}>
                        <SvgIcon className="group-hover:text-white text-teal transition" name="arrow-down"/>
                        Filters
                    </Button>
                    <Button variant="outline" className="group w-full">
                        <SvgIcon className="group-hover:text-white text-teal transition" name="arrow-down"/>
                        Sort
                    </Button>
                </Container>
            </div>

            {/* Filters UI */}
            <div
                className={`z-10 fixed border-2 top-0 left-0 right-0 bottom-0 bg-white ${isFiltersUiOpen ? "block" : "hidden"}`}
            >
                <Button className="z-10 !rounded-full absolute top-1 right-1" onClick={handleToggleFiltersUi}>X</Button>

                <div className="relative overflow-auto h-screen px-4 pb-32" ref={root}>
                    <SideFilters filters={filters}/>
                    <MainFilters filters={filters}/>
                </div>

                <div className="flex flex-col gap-2 justify-center items-center absolute bottom-0 w-full h-32 bg-white">
                    <Button onClick={handleClear} className="mb-3" variant="text">Reset filters</Button>
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </div>
        </div>
    );
};

export default ResultsDetailedFiltersMobile;
