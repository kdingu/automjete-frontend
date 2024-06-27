import React from "react";
import {noop} from "@/helpers/utilities/utils";
import Image from "next/image";
import SvgIcon from "@/components/svg-icon";
import {useTranslation} from "next-i18next";

const BodyTypeOption = (props) => {
    const {active = false, disabled = false, data = {}, onClick = noop} = props;

    const {t} = useTranslation("search");

    return (
        <div
            className={`${disabled ? "pointer-events-none opacity-40" : "cursor-pointer"} group relative inline-block rounded border border-transparent p-2 text-center text-sm text-gray-600 hover:border-teal-800`}
            onClick={() => onClick(data)}
        >
            {active && (
                <div className="absolute right-1 top-1">
                    <SvgIcon
                        name="tick"
                        className="fill-teal-500 group-hover:fill-teal-800"
                    />
                </div>
            )}
            <Image
                src={data.imageUrl}
                alt="kot"
                height={100}
                width={100}
                className="ml-auto mr-auto"
            />
            <p
                className={`mt-2 group-hover:text-teal-600 ${active ? "text-teal-800" : ""}`}
            >
                {t(data.label)}
            </p>
            {/* <p>(1028)</p>*/}
        </div>
    );
};

export default BodyTypeOption;
