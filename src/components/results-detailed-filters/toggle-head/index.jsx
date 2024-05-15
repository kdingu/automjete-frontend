import React from "react";
import SvgIcon from "@/components/svg-icon";
import { noop } from "@/helpers/utilities/utils";

const DISABLED_TEXT_COLOR = "text-gray-300";

const ToggleHead = (props) => {
  const {
    onClick = noop,
    disabled,
    title,
    iconText,
    alwaysOpened,
    withPopup,
    isOpen,
  } = props;

  return (
    <div
      className={`Toggled__Head ${!alwaysOpened && !disabled && "cursor-pointer" || "pointer-events-none"} flex h-12 items-center justify-between px-2`}
      onClick={onClick}
    >
      <span className={`text-sm font-semibold ${disabled ? DISABLED_TEXT_COLOR : "text-blue-800"}`}>{title}</span>
      <span className="flex items-center justify-end gap-1">
        <span className={`text-xs ${disabled ? DISABLED_TEXT_COLOR : "text-gray-500"}`}>{iconText}</span>
        {!alwaysOpened && (
          <SvgIcon
            name={
              withPopup ? "arrow-right" : isOpen ? "arrow-down" : "arrow-right"
            }
            className={`${disabled ? DISABLED_TEXT_COLOR : "text-blue-800"}`}
            size="4"
          />
        )}
      </span>
    </div>
  );
};

export default ToggleHead;
