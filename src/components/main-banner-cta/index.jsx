import React from "react";
import SearchForm from "@/components/main-banner-cta/components/search-form";
import MotorsImage from "@/components/motors-image";

const MainBannerCTA = (props) => {
    const {image = {}} = props;

    // TODO: make MotorsImage width and height props responsive

    return (
        <div className="relative z-0 overflow-hidden p-6">
            <MotorsImage
                className="absolute right-0 top-1/2 z-0 w-full -translate-y-1/2"
                src={image.url}
                width={1080}
                height={1920}
            />

            <SearchForm/>
        </div>
    );
};

export default MainBannerCTA;
