import React from "react";
import css from "./styles.module.css";
import { noop } from "@/helpers/utilities/utils";
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
        return `${disabled && "!text-gray-400 pointer-events-none cursor-normal"}  text-blue-400 hover:text-blue-500 transition`;
      case "link":
        return `${disabled && "!text-gray-400 pointer-events-none cursor-normal"} transition text-blue-400 border-b-2 border-blue-400 px-1 hover:text-blue-500 hover:border-blue-500`;
      case "outline":
        return `${disabled && "!text-gray-400 pointer-events-none cursor-normal border-gray-100 !bg-gray-100"} rounded-sm px-4 py-1 min-h-[40px] bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-50 hover:border-blue-200 transition-bg transition`;
      default: // fill
        return `${disabled && "!text-gray-400 pointer-events-none cursor-normal border-gray-100 !bg-gray-100"} rounded-sm px-4 py-1 min-h-[40px] border border-blue-400 bg-blue-400 text-white hover:bg-blue-500 hover:border-blue-500 transition-bg transition`;
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
            <SvgIcon name={icon} color="white" />
          )}
          {children || text}
          {icon && iconPosition === "right" && (
            <SvgIcon name={icon} color="white" />
          )}
        </div>
      </button>
    </>
  );
};

export default Button;
