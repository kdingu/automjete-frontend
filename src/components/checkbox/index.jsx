import React from "react";
import { noop } from "@/helpers/utilities/utils";
import SvgIcon from "@/components/svg-icon";

const Checkbox = (props) => {
  const { active = false, disabled = false, data = {}, onClick = noop } = props;

  return (
    <div
      className={`${disabled ? "pointer-events-none opacity-40" : "cursor-pointer"} group flex items-center gap-2`}
      onClick={() => onClick(data)}
    >
      <div
        className={`relative h-6 w-6 border transition group-hover:border-blue-400 ${active ? "border-blue-400" : ""}`}
      >
        <div
          className={`absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 transform transition ${active ? "opacity-100" : "opacity-0"}`}
        >
          <SvgIcon name="tick" />
        </div>
      </div>
      <span className="text-sm">{data.label}</span>
    </div>
  );
};

export default Checkbox;
