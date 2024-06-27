import React from "react";
import {noop} from "@/helpers/utilities/utils";
import SvgIcon from "../svg-icon";

const Button = (props) => {
    const {
        variant = "fill",
        className = "",
        type = "button",
        onClick = noop,
        text = "",
        icon = false,
        iconPosition = "left",
        isGroupElement,
        children,
        disabled
    } = props;

    const getVariantClasses = () => {
        if (isGroupElement) return "";

        switch (variant) {
            case "text":
                return `${disabled && "!text-gray-400 pointer-events-none cursor-normal"}  text-teal hover:text-teal-500 transition`;
            case "link":
                return `${disabled && "!text-gray-400 pointer-events-none cursor-normal"} transition text-teal border-b-2 border-teal px-1 hover:text-teal-500 hover:border-teal-500`;
            case "outline":
                return `${disabled && "!text-gray-400 pointer-events-none cursor-normal border-gray-100 !bg-gray-100"} rounded-sm px-4 py-1 min-h-[40px] bg-transparent border border-teal text-teal hover:bg-teal-100 hover:border-teal-200 transition-bg transition`;
            default: // fill
                return `${disabled && "!text-gray-400 pointer-events-none cursor-normal border-gray-100 !bg-gray-100"} rounded-sm px-4 py-1 min-h-[40px] border border-teal bg-teal text-white hover:bg-teal-500 hover:border-teal-500 transition-bg transition`;
        }
    };

    return (
        <>
            <button
                className={`${getVariantClasses()} ${className} `}
                type={type}
                onClick={() => onClick()}
            >
                <div className="flex items-center justify-center gap-1">
                    {icon && iconPosition === "left" && (
                        <SvgIcon name={icon} color="white"/>
                    )}
                    {children || text}
                    {icon && iconPosition === "right" && (
                        <SvgIcon name={icon} color="white"/>
                    )}
                </div>
            </button>
        </>
    );
};

export default Button;
