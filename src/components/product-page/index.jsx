import React from "react";
import {useRouter} from "next/router";
import ProductImages from "./components/product-images";
import SvgIcon from "../svg-icon";
import MainProductData from "./components/main-product-data";
import FullProductData from "./components/full-product-data";
import {getSessionLoggedIn, getSessionUserSavedVehicles} from "@/helpers/selectors";
import {connect} from "react-redux";
import useSavedVehiclesUpdater from "@/helpers/hooks/useSavedVehiclesUpdater";

const ProductPage = ({isLoggedIn, vehicle, savedVehicles}) => {
    const isSaved = savedVehicles?.vehicles?.find((vehicleData) => vehicleData.id === vehicle.id);

    const router = useRouter();
    const saveVehicleHandler = useSavedVehiclesUpdater(savedVehicles);

    const handleClickSave = () => {
        saveVehicleHandler(vehicle);
    };

    return (
        <>
            <div className="flex justify-between mt-4 mb-4">
                <div className="cursor-pointer" onClick={() => router.back()}>
                    <SvgIcon name="backIconPdp"/>
                </div>
                <div className="flex gap-4">
                    {isLoggedIn && (
                        <span className="cursor-pointer" onClick={handleClickSave}>
                            {isSaved ? (
                                <SvgIcon name="wishlistRedFull"/>
                            ) : (
                                <SvgIcon name="wishlistRedEmpty"/>
                            )}
                        </span>
                    )}

                    <span className="cursor-pointer">
                        <SvgIcon name="shareSocial"/>
                    </span>
                </div>
            </div>
            <div className="flex gap-10">
                <div className="md:w-7/12 w-full">
                    <ProductImages images={vehicle.images}/>
                    <div className="md:hidden">
                        <MainProductData product={vehicle}/>
                    </div>
                    <FullProductData product={vehicle}/>
                </div>
                <div className="md:w-5/12 hidden md:block">
                    <MainProductData product={vehicle}/>
                    <div className="text-2xl mt-5">Financing: Coming soon</div>
                </div>
            </div>
            <div className="flex gap-10">
                <div className="w-7/12">
                </div>
                <div className="w-5/12">
                </div>
            </div>
        </>
    );
};

const getProps = (state) => {
    return {
        savedVehicles: getSessionUserSavedVehicles(state),
        isLoggedIn: getSessionLoggedIn(state)
    }
};

export default connect(getProps)(ProductPage);
