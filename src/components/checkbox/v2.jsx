import React from "react";
import { noop } from "@/helpers/utilities/utils";
import SvgIcon from "@/components/svg-icon";

const Checkbox = (props) => {
  const { label, id, ...field } = props;

  return (
    <div className="flex items-center">
      <label htmlFor={id} className="relative cursor-pointer select-none">
        <input
          id={id}
          {...field}
          className="hidden"
          onClick={field.onClick || field.onChange}
        />
        <div className="w-6 h-6 border border-gray-400 rounded-sm bg-white flex items-center justify-center">
          {field.value && (
            <svg
              className="w-4 h-4 text-teal-500 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M9 16.2l-3.5-3.5a.984.984 0 0 1 0-1.4.984.984 0 0 1 1.4 0l2.1 2.1 5.6-5.6a.984.984 0 0 1 1.4 0c.4.4.4 1 0 1.4L10.4 16.6c-.4.4-1 .4-1.4 0z" />
            </svg>
          )}
        </div>
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
