import React from "react";
import Skeleton from "@/components/vehicle-card/skeleton";
import Tag from "@/components/tag";
import Pill from "@/components/pill";
import SvgIcon from "@/components/svg-icon";
import VehicleImages from "@/components/vehicle-card/vehicle-images";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {getSessionAccount} from "@/helpers/selectors";
import {connect} from "react-redux";
import {formatPrice} from "@/helpers/utilities/utils";

const VehicleCard = (props) => {
    // from selector
    const {account} = props;

    // from parent
    const {
        skeleton,
        id,
        price,
        title,
        description,
        images,
        owner,
        disableSave,
        handleSaveVehicle,
        savedVehiclesExists
    } = props;

    const {i18n} = useTranslation();
    const router = useRouter();

    const handleGoToProfile = (e) => {
        e.stopPropagation();
        router.push(`/profiles/${owner?.id}`);
    }

    if (skeleton) return <Skeleton/>;

    // TODO: get from backend
    const quickDetails = [];

    const isSelfOwned = owner?.id === account?.id
    const getUrl = () => {
        if (isSelfOwned) return `/account/my-ads/edit/${id}`
        return `/vehicle/${id}`
    }

    return (
        <div
            onClick={() => router.push(getUrl())}
            className="flex rounded border shadow-sm transition hover:shadow-md cursor-pointer"
        >
            <div className="w-5/12 flex-grow">
                <VehicleImages images={images}/>
            </div>
            <div className="h-full w-7/12">
                <div className="mb-4 p-2">
                    <div className="mb-2 flex gap-2">
                        <Tag>Lorem ipsum</Tag>
                        <Tag variant="success">Lorem ipsum</Tag>
                    </div>
                    <div className="mb-3 flex justify-between">
                        <div className="font-bold">{formatPrice(price, i18n.language)}</div>
                        {!disableSave && (
                            <div>
                                <button onClick={(e) => handleSaveVehicle(e, {
                                    id,
                                    title,
                                    price,
                                    image: images[0].externalUrl
                                })}>
                                    <Pill className="transition hover:border-teal-600">
                                        <div className="flex items-center justify-center gap-0 text-xs">
                                            {
                                                savedVehiclesExists ?
                                                    <>
                                                        <SvgIcon
                                                            size='2'
                                                            className="w-[8px] mr-[2.5px]"
                                                            name="wishlistRedFull"
                                                        />
                                                        <span>Saved</span>
                                                    </>
                                                    :
                                                    <>
                                                        <SvgIcon name="mrez"/>
                                                        <span>Save</span>
                                                    </>
                                            }
                                        </div>
                                    </Pill>
                                </button>
                            </div>
                        )}
                    </div>
                    <h2 className="mb-1 text-sm">{title}</h2>
                    <p
                        className="mb-2 text-sm"
                        dangerouslySetInnerHTML={{__html: description}}
                    ></p>
                    {quickDetails.filter((v) => !!v).length > 0 ? (
                        <div className="text-sm font-bold">
                            {quickDetails.filter((v) => !!v).join(" | ")}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <hr/>

                <div className="flex items-center justify-between p-2 text-sm">
                    <div>
                        {owner && (
                            <div className="mb-3">
                                {owner?.name} -&nbsp;
                                <div onClick={handleGoToProfile}
                                     className="transition text-teal-400 hover:text-teal-600 inline-block p-1">
                                    See all {owner?.vehiclesCount} vehicles
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <SvgIcon name="pin"/>
                            location coming soon
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getProps = state => ({
    account: getSessionAccount(state)
})

export default connect(getProps)(VehicleCard);
