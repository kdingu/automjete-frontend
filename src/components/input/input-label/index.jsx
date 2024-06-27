import React from "react";

const InputLabel = ({id, label, className = ""}) => {
    return (
        <label
            htmlFor={id}
            className={`${className} w-max mb-1 block text-xs font-semibold text-gray-700`}
        >
            <p>{label}</p>
        </label>
    );
};

export default InputLabel;
