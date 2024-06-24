import React from "react"
import MotorsImage from "../motors-image";
import { formatPrice, noop } from "@/helpers/utilities/utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SvgIcon from "../svg-icon";

const SavedVehicleCard = ({vehicle, removeVehicle = noop}) => {
    const {i18n} = useTranslation();
    const router = useRouter();
    return (
        <div className="flex gap-4" onClick={() => router.push(`/vehicle/${vehicle.id}`)}>
            <div className="">
                <MotorsImage src={vehicle.image} className="max-h-[120px] w-auto" height={200} width={200} />
            </div>
            <div className="pt-2 w-full">
                <div className="text-sm text-gray-400 font-medium mb-1 flex justify-between">
                    <div>{formatPrice(vehicle.price, i18n.language)}</div>
                    <div className="pr-4" onClick={(e) => removeVehicle(e, vehicle)}>
                        <SvgIcon name="delete" />
                    </div>
                </div>
                <div className="text-sm text-teal-400 capitalize">{vehicle.title}</div>
            </div>
        </div>
    )
};

export default SavedVehicleCard;
